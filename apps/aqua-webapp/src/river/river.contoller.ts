import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/user/entities/user.entity";
import { UserCookie } from "src/user/user-cookie.decorator";

import { EngineService } from "../engine/engine.service";

@Controller()
export class RiverController {
  constructor(private readonly engine: EngineService) {}

  @Get("/game/:gameId/river/:index")
  async clickBoard(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Param("index", ParseIntPipe) index: number,
    @UserCookie() player: User,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.engine.playerAction(
      gameId,
      { row: null, column: index },
      player,
    );
    response.redirect(`/game/${gameId}`);
  }
}
