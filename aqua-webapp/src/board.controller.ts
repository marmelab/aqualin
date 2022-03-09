import { Controller, Get, Param, ParseIntPipe, Render } from "@nestjs/common";

import { GameService } from "./game.service";
import { Game } from "./types";

@Controller()
export class BoardController {
  constructor(private readonly gameService: GameService) {}

  @Get("/board/:row/:column")
  @Render("aqualinGameView")
  clickBoard(
    @Param("row", ParseIntPipe) row: number,
    @Param("column", ParseIntPipe) column: number,
  ): Game {
    return this.gameService.click({ row, column });
  }
}
