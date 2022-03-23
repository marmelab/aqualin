import {
  Body,
  Controller,
  HttpStatus,
  Patch,
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

  @Post("/resetPasswordRequest")
  async resetPasswordRequestController(
    @Req() request: Request,
    @Res() response: Response,
    @Body() email: string,
  ) {
    try {
      const requestPasswordResetService =
        await this.authService.requestPasswordReset(email);
      return response.status(HttpStatus.OK).json(requestPasswordResetService);
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    }
  }

  @Patch("/resetPassword")
  async resetPasswordController(
    @Req() request: Request,
    @Res() response: Response,
    @Body() userData: { userId: number; token: string; password: string },
  ) {
    try {
      const resetPasswordService = await this.authService.resetPassword(
        userData.userId,
        userData.token,
        userData.password,
      );
      return response.status(HttpStatus.OK).json(resetPasswordService);
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    }
  }
}
