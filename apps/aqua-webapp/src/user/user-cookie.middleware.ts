import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response } from "express";
import { WebappRequest } from "src/types";
import { isBot } from "src/utils/isBot";
import { v4 as uuidv4 } from "uuid";

import { UserService } from "./user.service";

@Injectable()
export class UserCookieMiddleWare implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(
    request: WebappRequest,
    response: Response,
    next: (error?: any) => void,
  ) {
    await this.getOrCreateUser(request, response);
    next();
  }

  async getOrCreateUser(request: WebappRequest, response: Response) {
    if (
      isBot(request) ||
      request.method === "OPTIONS" ||
      request.method === "options"
    ) {
      return;
    }
    let playerId: string = request.cookies["playerId"];
    if (playerId == null) {
      playerId = uuidv4();
      response.cookie("playerId", playerId, {
        maxAge: 24 * 60 * 60 * 1000 * 365 * 30,
      });
    }
    const dbUser = await this.userService.findOne(playerId);
    if (dbUser) {
      request.userCookie = dbUser;
      return;
    }
    request.userCookie = await this.userService.create(
      playerId,
      playerId,
      request.ip,
    );
  }
}
