import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";

export const RESET_PASSWORD_PATH: string = "/resetPasswordForm";

@Controller("users")
export class UserController {
  @Get(RESET_PASSWORD_PATH)
  @Render("resetPasswordForm")
  resetPasswordForm(@Param() params: string[]) {
    return {};
  }

  @Post("/resetPassword")
  async resetPassword(
    @Body() password: string,
    @Param("token") token: string,
    @Param("id") id: string,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const userData = {
      id: parseInt(id),
      token,
      password,
    };

    response.json(userData);
    response.redirect(`api/auth/resetPassword`);
  }
}
