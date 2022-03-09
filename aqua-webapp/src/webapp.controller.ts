import { GameState, playTurn } from "@aqua/core";
import { Controller, Get, Param, ParseIntPipe, Render } from "@nestjs/common";

import { WebappService } from "./webapp.service";

export type Player = { name: string; role: string; turn: boolean };
export type Game = {
  playerOne: Player;
  playerTwo: Player;
  gameState: GameState;
  message?: string;
};

@Controller()
export class WebappController {
  constructor(private readonly webappService: WebappService) {}

  @Get("/new")
  @Render("aqualinGameView")
  newGame(): Game {
    return this.webappService.startNewGame();
  }

  @Get()
  @Render("aqualinGameView")
  showGame(): Game {
    return this.webappService.getAqualinGame();
  }

  @Get("/board/:row/:column")
  @Render("aqualinGameView")
  clickBoard(
    @Param("row", ParseIntPipe) row: number,
    @Param("column", ParseIntPipe) column: number,
  ): Game {
    return this.webappService.click({ row, column });
  }
}
