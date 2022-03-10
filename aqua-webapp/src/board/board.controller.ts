import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { getPlayerId } from "src/game.controller";

import { EngineService } from "../engine/engine.service";

@Controller()
export class BoardController {
  constructor(private readonly engine: EngineService) {}

  @Get("/:id/board/:row/:column")
  async clickBoard(
    @Param("id", ParseIntPipe) id: number,
    @Param("row", ParseIntPipe) row: number,
    @Param("column", ParseIntPipe) column: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.engine.click(
      id,
      { row, column },
      getPlayerId(request, response),
    );
    response.redirect(`/${id}`);
  }
}
