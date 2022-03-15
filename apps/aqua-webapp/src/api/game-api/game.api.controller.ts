import { Coordinates } from "@aqua/core";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";

import { EngineService } from "../../engine/engine.service";
import { getPlayerId } from "../../game/game.controller";
import { GameTemplate } from "../../types";

@Controller("api/games")
export class GameApiController {
  constructor(private readonly engine: EngineService) {}

  @Post()
  async create(@Req() request: Request, @Res() response: Response) {
    const data = await this.engine.startNewGame(getPlayerId(request, response));
    response.status(HttpStatus.CREATED).json(data);
  }

  @Get("/:gameId")
  async findOne(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const data = await this.engine.loadAndUpdateAqualinGame(
      gameId,
      getPlayerId(request, response),
    );
    response.status(HttpStatus.OK).json(data);
  }

  @Patch(":gameId")
  async registerAction(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Req() request: Request,
    @Res() response: Response,
    @Body() coordinates: Coordinates,
  ) {
    const data = await this.engine.playerAction(
      gameId,
      coordinates,
      getPlayerId(request, response),
    );
    response.status(HttpStatus.OK).json(data);
    return;
  }
}
