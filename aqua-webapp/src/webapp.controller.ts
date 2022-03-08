import { GameState, parseRows, playTurn } from "@aqua/core";
import { Controller, Get, Param, Render } from "@nestjs/common";

import { isPlayerTurn, WebappService } from "./webapp.service";

export type Game = {
  playerOne: { name: string; role: string; turn: boolean };
  playerTwo: { name: string; role: string; turn: boolean };
  gameState: GameState;
};

@Controller()
export class WebappController {
  constructor(private readonly webappService: WebappService) {}

  @Get("/new")
  @Render("aqualinGameView")
  newGame(): Game {
    return this.webappService.startNewGame();
  }

  @Get("/")
  @Render("aqualinGameView")
  showGame(): Game {
    return this.webappService.getAqualinGame();
  }

  @Get("/board/:row/:column")
  @Render("aqualinGameView")
  clickBoard(@Param("row") row: string, @Param("column") column: string): Game {
    const game = this.webappService.getAqualinGame();
    const coordinates = {
      row: parseInt(row),
      column: parseInt(column),
    };
    try {
      game.gameState = playTurn(game.gameState, coordinates).gameState;
    } catch (e) {}
    return game;
  }
}
