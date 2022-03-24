import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";

export type JwtUSer = { userId: number; username: string; admin: boolean };

@Injectable()
export class AuthAdminService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(username: string, pass: string) {
    const user = await this.userService.findOne(username);
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

  async login(user: JwtUSer) {
    const payload = {
      username: user.username,
      sub: user.userId,
      admin: user.admin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
