import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Observable, tap } from "rxjs";
import { BannedIp } from "src/banned-ip/entities/bannedIp.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserUpdatePatchInterceptor implements NestInterceptor {
  #userRepository: Repository<User>;
  #bannedIpRepository: Repository<BannedIp>;
  constructor(
    @InjectRepository(User) userRepository: Repository<User>,
    @InjectRepository(BannedIp) bannedIpRepository: Repository<BannedIp>,
  ) {
    this.#userRepository = userRepository;
    this.#bannedIpRepository = bannedIpRepository;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as Request;
    if (request.body?.banned != null) {
      this.handleBan(request);
    }
    return next.handle();
  }

  private async handleBan(request: Request) {
    const user = await this.#userRepository.findOne(request.params.id);
    if (!user || request.body.banned === user.banned) {
      return;
    }
    if (request.body.banned) {
      this.ban(user);
    } else {
      this.unban(user);
    }
  }

  async ban(user: User) {
    user.banned = true;
    this.#userRepository.save(user);
    if (user.ipAddress == null) {
      return;
    }
    const found = await this.#bannedIpRepository.find({
      ipAddress: user.ipAddress,
    });
    console.log(found);
    if (found.length !== 0) {
      return;
    }
    const bannedIp = new BannedIp();
    bannedIp.ipAddress = user.ipAddress;
    await this.#bannedIpRepository.save(bannedIp);
  }

  async unban(user: User) {
    user.banned = false;
    this.#userRepository.save(user);
    if (user.ipAddress == null) {
      return;
    }
    const ipAddresses = await this.#bannedIpRepository.find({
      ipAddress: user.ipAddress,
    });
    if (ipAddresses.length === 0) {
      return;
    }
    this.#bannedIpRepository.remove(ipAddresses);
  }
}
