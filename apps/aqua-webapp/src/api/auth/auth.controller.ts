import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { AuthService, JwtUSer, LocalUser } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Req() req: Request) {
    return this.authService.login(req.user as JwtUSer);
  }
}
