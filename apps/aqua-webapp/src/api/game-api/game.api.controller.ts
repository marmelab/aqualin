import { Coordinates } from "@aqua/core";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Render,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";

import { EngineService } from "../../engine/engine.service";
import { getPlayerId } from "../../game/game.controller";
import { GameTemplate } from "../../types";

@Controller()
export class GameApiController {
  constructor(private readonly engine: EngineService) {}

  @Post("/api/game/new")
  async startNewGame(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<GameTemplate> {
    return this.engine.startNewGame(getPlayerId(request, response));
  }

  @Get("/api/game/:gameId")
  @Render("aqualinGameView")
  showGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<GameTemplate> {
    return this.engine.loadAndUpdateAqualinGame(
      gameId,
      getPlayerId(request, response),
    );
  }

  @Patch("/api/game/:gameId")
  registerAction(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Req() request: Request,
    @Res() response: Response,
    @Body() action: Coordinates,
  ): Promise<GameTemplate> {
    return this.engine.playerAction(
      gameId,
      action,
      getPlayerId(request, response),
    );
  }
}
