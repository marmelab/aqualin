import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MailService } from "./mail.service";

@Module({
  imports: [ConfigModule, MailerModule],

  providers: [MailService],
})
export class MailModule {}
