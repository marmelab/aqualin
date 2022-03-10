import { Controller, Get, Param, ParseIntPipe, Res } from "@nestjs/common";
import { Response } from "express";

import { EngineService } from "../engine/engine.service";

@Controller()
export class RiverController {
  constructor(private readonly engine: EngineService) {}

  @Get("/game/:gameId/river/:index")
  async clickBoard(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Param("index", ParseIntPipe) index: number,
    @Res() response: Response,
  ): Promise<void> {
    await this.engine.click(gameId, { row: null, column: index });
    response.redirect(`/${gameId}`);
  }
}
