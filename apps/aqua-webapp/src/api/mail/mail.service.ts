import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  public sendEmail(
    email: string,
    subject: string,
    data: any,
    template: string,
  ): void {
    this.mailerService
      .sendMail({
        to: email, // List of receivers email address
        from: process.env.AQUALIN_MAIL, // Senders email address
        subject: subject,
        template: template, // The `.pug` or `.hbs` extension is appended automatically.
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
