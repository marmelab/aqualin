import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  public sendEmail(
    email: string,
    subject: string,
    data: any,
    template: string,
  ): void {
    this.mailerService
      .sendMail({
        to: email, // List of receivers email address
        from: this.configService.get("MAIL_FROM"), // Senders email address
        subject,
        template, // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          data,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
