import { Controller, Get, Param, ParseIntPipe, Render } from "@nestjs/common";

import { EngineService } from "../engine/engine.service";
import { Game } from "../types";

@Controller()
export class RiverController {
  constructor(private readonly engine: EngineService) {}

  @Get("/river/:index")
  @Render("aqualinGameView")
  clickBoard(@Param("index", ParseIntPipe) index: number): Game {
    return this.engine.click({ row: null, column: index });
  }
}
