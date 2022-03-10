import { Controller, Get, Param, ParseIntPipe, Res } from "@nestjs/common";
import { Response } from "express";

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
  ): Promise<void> {
    await this.engine.click(id, { row, column });
    response.redirect(`/${id}`);
  }
}
