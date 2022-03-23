import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthAdminService, LocalUser } from "./auth-admin.service";

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthAdminService) {
    super();
  }

  async validate(username: string, password: string): Promise<LocalUser> {
    try {
      const user = await this.authService.authenticate(username, password);
      if (!user || !user.admin) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
