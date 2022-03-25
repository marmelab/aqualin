import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Render,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";

import { UserService } from "./user.service";

export const RESET_PASSWORD_PATH: string = "resetPasswordForm";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @Get("/" + RESET_PASSWORD_PATH)
  @Render("resetPasswordForm")
  resetPasswordForm(
    @Query("token") token: string,
    @Query("id", ParseIntPipe) id: number,
  ) {
    return { token, id };
  }

  @Post("/resetPassword")
  async resetPassword(
    @Body() body: { password: string; id: number; token: string },

    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.userService.resetPassword(body.id, body.token, body.password);
    response.redirect(`/`);
  }
}
