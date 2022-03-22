import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/user/entities/user.entity";
import { UserCookie } from "src/user/user-cookie.decorator";

import { EngineService } from "../engine/engine.service";

@Controller()
export class BoardController {
  constructor(private readonly engine: EngineService) {}

  @Get("/game/:gameId/board/:row/:column")
  async clickBoard(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Param("row", ParseIntPipe) row: number,
    @Param("column", ParseIntPipe) column: number,
    @UserCookie() player: User,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.engine.playerAction(gameId, { row, column }, player);
    response.redirect(`/game/${gameId}`);
  }
}
