import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  Res,
} from "@nestjs/common";
import { Response } from "express";

import { EngineService } from "../engine/engine.service";
import { GameTemplate } from "../types";

@Controller()
export class GameController {
  constructor(private readonly engine: EngineService) {}

  @Get()
  @Render("homePage")
  homePage() {
    return {};
  }

  @Get("/new")
  async startNewGame(@Res() response: Response): Promise<void> {
    const game = await this.engine.startNewGame();
    response.redirect(`/game/${game.id}`);
  }

  @Get("/startGameFromFile")
  async startGame(@Res() response: Response): Promise<void> {
    const game = await this.engine.startGameFromFile();
    response.redirect(`/game/${game.id}`);
  }

  @Get("/game/:gameId")
  @Render("aqualinGameView")
  showGame(
    @Param("gameId", ParseIntPipe) gameId: number,
  ): Promise<GameTemplate> {
    return this.engine.getAqualinGame(gameId);
  }
}
