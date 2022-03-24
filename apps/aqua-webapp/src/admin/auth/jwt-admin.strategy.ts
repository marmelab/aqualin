import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, "admin-jwt") {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies) {
          return req.cookies["jwt"].access_token;
        }
        return null;
      },
      secretOrKey: process.env.JWT_SECRET || "secretKey",
    });
  }

  async validate(payload: any) {
    if (!payload.admin) {
      return null;
    }
    return {
      userId: payload.sub,
      username: payload.username,
      admin: payload.admin,
    };
  }
}
