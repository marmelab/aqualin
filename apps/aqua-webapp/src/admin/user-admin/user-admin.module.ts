import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";

import { UserAdminController } from "./user-admin.controller";
import { UserAdminService } from "./user-admin.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserAdminService],
  exports: [UserAdminService],
  controllers: [UserAdminController],
})
export class UserAdminModule {}
