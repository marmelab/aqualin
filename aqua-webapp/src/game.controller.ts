import { Controller, Get, Render } from "@nestjs/common";

import { GameService } from "./game.service";
import { Game } from "./types";

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get("/new")
  @Render("aqualinGameView")
  newGame(): Game {
    return this.gameService.startNewGame();
  }

  @Get()
  @Render("aqualinGameView")
  showGame(): Game {
    return this.gameService.getAqualinGame();
  }
}
