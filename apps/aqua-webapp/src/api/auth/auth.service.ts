import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { UserService } from "src/user/user.service";

export type LocalUser = { id: number; username: string };
export type JwtUSer = { userId: number; username: string };
export type ResetPasswordToken = {
  token: string;
  createdAt: {
    dateInMs: number;
    expires: number; // this is the expiry time in seconds
  };
};
const saltRounds = 10;
const expiresInMs = 3600;
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<LocalUser> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      return null;
    } else {
      const isSame: boolean = await bcrypt.compare(pass, user.password);
      if (isSame) {
        const { password, ...result } = user;
        return result;
      } else throw new Error("Wrong password");
    }
  }

  async login(jwtUser: JwtUSer) {
    const payload = { username: jwtUser.username, sub: jwtUser.userId };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }

  async requestPasswordReset(email: string) {
    let user = await this.userService.findOneByEmail(email);

    if (!user) throw new Error("User does not exist");

    const token = await bcrypt.hash(randomUUID(), saltRounds).then((hash) => {
      return hash;
    });

    user.resetPasswordTtoken = {
      token,
      createdAt: { dateInMs: Date.now(), expires: expiresInMs },
    };
    user = await this.userService.save(user);
    //TODO :send reset Password
    // const link = `${clientURL}/passwordReset?token=${resetTokenPassword}&id=${user.id}`;
    // sendEmail(
    //   user.email,
    //   "Password Reset Request",
    //   { name: user.name, link: link },
    //   "./template/requestResetPassword.handlebars",
    // );
    // return link;
  }

  async resetPassword(userId: number, token: string, password: string) {
    const user = await this.userService.findOne(userId);
    const resetPasswordToken = user.resetPasswordTtoken;
    if (!resetPasswordToken || this.hasTokenExpired(resetPasswordToken)) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, resetPasswordToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashPassword;
    user.resetPasswordTtoken = null;
    await this.userService.save(user);
    //TODO :send confirmation reset Password
    // const user = await User.findById({ _id: userId });
    // sendEmail(
    //   user.email,
    //   "Password Reset Successfully",
    //   {
    //     name: user.name,
    //   },
    //   "./template/resetPassword.handlebars",
    // );
  }

  hasTokenExpired(resetPasswordToken: ResetPasswordToken) {
    return (
      Date.now() >
      resetPasswordToken.createdAt.dateInMs +
        resetPasswordToken.createdAt.expires
    );
  }
}
