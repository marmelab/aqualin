import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { EngineService } from "../engine/engine.service";
import { getPlayerId } from "../game/game.controller";

@Controller()
export class RiverController {
  constructor(private readonly engine: EngineService) {}

  @Get("/game/:gameId/river/:index")
  async clickBoard(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Param("index", ParseIntPipe) index: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.engine.click(
      id,
      { row: null, column: index },
      getPlayerId(request, response),
    );
    response.redirect(`/game/${id}`);
  }
}
