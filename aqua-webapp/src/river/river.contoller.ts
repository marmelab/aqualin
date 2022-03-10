import { Controller, Get, Param, ParseIntPipe, Res } from "@nestjs/common";
import { Response } from "express";

import { EngineService } from "../engine/engine.service";

@Controller()
export class RiverController {
  constructor(private readonly engine: EngineService) {}

  @Get("/:id/river/:index")
  async clickBoard(
    @Param("id", ParseIntPipe) id: number,
    @Param("index", ParseIntPipe) index: number,
    @Res() response: Response,
  ): Promise<void> {
    await this.engine.click(id, { row: null, column: index });
    response.redirect(`/${id}`);
  }
}
