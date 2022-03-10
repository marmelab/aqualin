import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { getPlayerId } from "src/game.controller";

import { EngineService } from "../engine/engine.service";

@Controller()
export class RiverController {
  constructor(private readonly engine: EngineService) {}

  @Get("/:id/river/:index")
  async clickBoard(
    @Param("id", ParseIntPipe) id: number,
    @Param("index", ParseIntPipe) index: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.engine.click(
      id,
      { row: null, column: index },
      getPlayerId(request, response),
    );
    response.redirect(`/${id}`);
  }
}
