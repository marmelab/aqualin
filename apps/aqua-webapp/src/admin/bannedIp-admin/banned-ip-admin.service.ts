import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { BannedIp } from "src/banned-ip/entities/bannedIp.entity";
import { Repository } from "typeorm";

@Injectable()
export class BannedIpAdminService extends TypeOrmCrudService<BannedIp> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(@InjectRepository(BannedIp) repo: Repository<BannedIp>) {
    super(repo);
  }
}
