import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { EngineService } from "../engine/engine.service";
import { getPlayerId } from "../game/game.controller";

@Controller()
export class BoardController {
  constructor(private readonly engine: EngineService) {}

  @Get("/game/:gameId/board/:row/:column")
  async clickBoard(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Param("row", ParseIntPipe) row: number,
    @Param("column", ParseIntPipe) column: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.engine.click(
      gameId,
      { row, column },
      getPlayerId(request, response),
    );
    response.redirect(`/game/${gameId}`);
  }
}
