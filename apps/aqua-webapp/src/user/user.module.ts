import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "src/api/mail/mail.module";
import { MailService } from "src/api/mail/mail.service";

import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  providers: [UserService, MailService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
