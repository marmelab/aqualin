import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/user/entities/user.entity";

import { UserService } from "../../user/user.service";

@Controller("api/users")
export class UserController {
  constructor(private userService: UserService) {}
  @Post("")
  async getcreate(
    @Req() request: Request,
    @Body() userData: { username: string; password: string },
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.userService.create(
        userData.username,
        userData.password,
        request.ip,
      );

      return response
        .status(HttpStatus.OK)
        .json({ id: user.id, username: user.username });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
