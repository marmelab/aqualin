import { Controller, Get, Render } from "@nestjs/common";

import { EngineService } from "./engine/engine.service";
import { Game } from "./types";

@Controller()
export class GameController {
  constructor(private readonly engine: EngineService) {}

  @Get("/new")
  @Render("aqualinGameView")
  newGame(): Game {
    return this.engine.startNewGame();
  }

  @Get()
  @Render("aqualinGameView")
  showGame(): Game {
    return this.engine.getAqualinGame();
  }
}
