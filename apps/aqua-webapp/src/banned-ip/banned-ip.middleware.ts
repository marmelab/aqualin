import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import ipRangeCheck from "ip-range-check";
import { WebappRequest } from "src/types";
import { Repository } from "typeorm";

import { BannedIp } from "./entities/bannedIp.entity";

@Injectable()
export class BannedIpMiddleware implements NestMiddleware {
  readonly #bannedIpRepository: Repository<BannedIp>;

  constructor(
    @InjectRepository(BannedIp)
    bannedIpRepository: Repository<BannedIp>,
  ) {
    this.#bannedIpRepository = bannedIpRepository;
  }

  async use(
    request: WebappRequest,
    response: Response,
    next: (error?: any) => void,
  ) {
    await this.checkBannedIp(request);
    next();
  }

  async checkBannedIp(request: Request) {
    const bannedIps = await this.#bannedIpRepository.find();
    const clientIp = request.ip;
    for (const bannedIp of bannedIps) {
      if (ipRangeCheck(clientIp, bannedIp.ipAddress)) {
        throw new Error("Banned IP" + request.ip);
      }
    }
  }
}
