import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";

import { AuthService, JwtUSer } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Req() request: Request, @Res() response: Response) {
    try {
      const jwt = await this.authService.login(request.user as JwtUSer);

      return response.status(HttpStatus.OK).json(jwt.access_token);
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    }
  }
}
