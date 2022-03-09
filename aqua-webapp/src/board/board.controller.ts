import { Controller, Get, Param, ParseIntPipe, Render } from "@nestjs/common";

import { EngineService } from "../engine/engine.service";
import { Game } from "../types";

@Controller()
export class BoardController {
  constructor(private readonly engine: EngineService) {}

  @Get("/board/:row/:column")
  @Render("aqualinGameView")
  clickBoard(
    @Param("row", ParseIntPipe) row: number,
    @Param("column", ParseIntPipe) column: number,
  ): Game {
    return this.engine.click({ row, column });
  }
}
