import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { EngineService } from "../engine/engine.service";
import { GameTemplate } from "../types";
import { isBot } from "../utils/isBot";

@Controller()
export class GameController {
  constructor(private readonly engine: EngineService) {}

  @Get()
  @Render("homePage")
  homePage() {
    return {};
  }

  @Get("/new")
  async startNewGame(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const game = await this.engine.startNewGame(getPlayerId(request, response));

    response.redirect(`/game/${game.id}`);
  }

  @Get("/startGameFromFile")
  async startGame(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const game = await this.engine.startGameFromFile(
      getPlayerId(request, response),
    );
    response.redirect(`/game/${game.id}`);
  }

  @Get("/game/:gameId")
  @Render("aqualinGameView")
  showGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<GameTemplate> {
    return this.engine.loadAndUpdateAqualinGame(
      gameId,
      getPlayerId(request, response),
    );
  }
}

export const getPlayerId = (request: Request, response: Response): string => {
  if (!isBot(request)) {
    let playerId = request.cookies["playerId"];
    if (playerId == null) {
      playerId = uuidv4();
      response.cookie("playerId", playerId);
    }
    return playerId;
  }
  return null;
};
