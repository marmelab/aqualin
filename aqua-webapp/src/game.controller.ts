import { Controller, Get, Param, ParseIntPipe, Render } from "@nestjs/common";

import { EngineService } from "./engine/engine.service";
import { Game } from "./types";

@Controller()
export class GameController {
  constructor(private readonly engine: EngineService) {}

  @Get("/new")
  @Render("aqualinGameView")
  startNewGame(): Game {
    return this.engine.startNewGame();
  }
  @Get("/:id")
  @Render("aqualinGameView")
  startGame(@Param("id", ParseIntPipe) id: number): Game {
    return this.engine.startGame(id);
  }

  @Get()
  @Render("aqualinGameView")
  showGame(): Game {
    return this.engine.getAqualinGame();
  }
}
