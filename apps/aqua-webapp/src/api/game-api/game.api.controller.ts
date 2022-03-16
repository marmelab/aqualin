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

@Controller("api/games")
export class GameApiController {
  constructor(private readonly engine: EngineService) {}

  @Post()
  async create(@Req() request: Request, @Res() response: Response) {
    const data = await this.engine.startNewGame(getPlayerId(request, response));
    if (!data) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return response.status(HttpStatus.CREATED).json(data);
  }

  @Get("/:gameId")
  async findOne(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const data = await this.engine.loadAndUpdateAqualinGame(
        gameId,
        getPlayerId(request, response),
      );
      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.NOT_FOUND).json(error.message);
    }
  }

  @Patch("/:gameId")
  async registerAction(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Req() request: Request,
    @Res() response: Response,
    @Body() coordinates: Coordinates,
  ) {
    console.log(request.body);
    console.log(coordinates);
    try {
      const data = await this.engine.playerAction(
        gameId,
        request.body,
        getPlayerId(request, response),
      );
      console.log(data);
      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.NOT_FOUND).json(error.message);
    }
  }
}
