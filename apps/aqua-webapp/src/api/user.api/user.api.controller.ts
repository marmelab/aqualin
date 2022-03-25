import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/user/entities/user.entity";
import { UserService } from "../../user/user.service";

@Controller("api/users")
export class UserApiController {
  constructor(private userService: UserService) {}
  @Post("")
  async create(
    @Req() request: Request,
    @Body() userData: { username: string; password: string; email: string },
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.userService.create(
        userData.username,
        userData.password,
        request.ip,
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
      await this.userService.requestPasswordReset(body.email);
      return response.status(HttpStatus.OK).json({});
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
