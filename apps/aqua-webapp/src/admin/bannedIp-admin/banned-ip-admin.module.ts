import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BannedIp } from "src/banned-ip/entities/bannedIp.entity";

import { BannedIpAdminController } from "./banned-ip-admin.controller";
import { BannedIpAdminService } from "./banned-ip-admin.service";

@Module({
  imports: [TypeOrmModule.forFeature([BannedIp])],
  providers: [BannedIpAdminService],
  exports: [BannedIpAdminService],
  controllers: [BannedIpAdminController],
})
export class BannedIpAdminModule {}
