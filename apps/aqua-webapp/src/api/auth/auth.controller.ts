import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() request, @Response() response) {
    try {
      let jwt = await this.authService.login(request.user);

      return response.status(HttpStatus.OK).json(jwt.access_token);
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
