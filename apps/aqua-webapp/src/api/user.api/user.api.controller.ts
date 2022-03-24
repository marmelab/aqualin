import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { Response, Request } from "express";
import { User } from "src/user/entities/user.entity";

import { UserService } from "../../user/user.service";

@Controller("api/users")
export class UserApiController {
  constructor(private userService: UserService) {}
  @Post("")
  async create(
    @Body() userData: { username: string; password: string; email: string },
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.userService.create(
        userData.username,
        userData.password,
        userData.email,
      );

      return response
        .status(HttpStatus.OK)
        .json({ id: user.id, username: user.username });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Post("/resetPasswordRequest")
  async resetPasswordRequestController(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: { email: string },
  ) {
    try {
      const requestPasswordResetService =
        await this.userService.requestPasswordReset(body.email);
      return response.status(HttpStatus.OK).json(requestPasswordResetService);
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    }
  }

  @Patch("/resetPassword")
  async resetPasswordController(
    @Req() request: Request,
    @Res() response: Response,
    @Body() userData: { id: number; token: string; password: string },
  ) {
    try {
      const resetPasswordService = await this.userService.resetPassword(
        userData.id,
        userData.token,
        userData.password,
      );
      return response.status(HttpStatus.OK).json(resetPasswordService);
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    }
  }
}
