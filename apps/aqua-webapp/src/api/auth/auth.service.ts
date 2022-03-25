import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";

export type LocalUser = { id: number; username: string };
export type JwtUSer = { userId: number; username: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
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
}
