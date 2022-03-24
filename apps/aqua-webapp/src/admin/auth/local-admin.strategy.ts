import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthAdminService } from "./auth-admin.service";

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  "admin-local",
) {
  constructor(private authService: AuthAdminService) {
    super();
  }

  async validate(username: string, password: string) {
    try {
      const user = await this.authService.authenticate(username, password);
      if (!user || !user.admin || user.banned) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
