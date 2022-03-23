import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";

import { AuthAdminService, JwtUSer } from "./auth-admin.service";
import { LocalAuthAdminGuard } from "./local-auth-admin.guard";

@Controller("admin/auth")
export class AuthAdminController {
  constructor(private authService: AuthAdminService) {}

  @UseGuards(LocalAuthAdminGuard)
  @Post("/login")
  async login(@Req() request: Request, @Res() response: Response) {
    try {
      const user = request.user as JwtUSer;
      const jwt = await this.authService.login(user);
      response.cookie("jwt", jwt, {
        httpOnly: true,
      });
      return response
        .status(HttpStatus.OK)
        .json({ id: user.userId, username: user.username });
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    }
  }

  @Post("/logout")
  async logout(@Req() request: Request, @Res() response: Response) {
    try {
      response.cookie("jwt", null, {
        httpOnly: true,
        maxAge: -1,
      });
      return response.status(HttpStatus.OK).json();
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    }
  }
}
