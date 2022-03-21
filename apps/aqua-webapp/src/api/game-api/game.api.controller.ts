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
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { GameTemplate } from "src/types";
import { UserService } from "src/user/user.service";

import { EngineService } from "../../engine/engine.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("api/games")
export class GameApiController {
  constructor(
    private readonly engine: EngineService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Req() request: Request, @Res() response: Response) {
    const data = await this.engine.startNewGame(
      await this.userService.getPlayer(request, response),
    );
    if (!data) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return response.status(HttpStatus.CREATED).json(data);
  }
  @Get("/open")
  async findOpenGames(@Req() request: Request, @Res() response: Response) {
    try {
      const games = await this.engine.findOpenGames();

      const gamesId = games.map((game) => {
        return game.id;
      });
      return response.status(HttpStatus.OK).json(gamesId);
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.NOT_FOUND).json(error.message);
    }
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
        await this.userService.getPlayer(request, response),
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
    @Body()
    action:
      | (Coordinates & { playerAction: "click" })
      | { playerAction: "join" },
  ) {
    try {
      let data: GameTemplate;
      if (action.playerAction && action.playerAction === "join") {
        data = await this.engine.loadAndUpdateAqualinGame(
          gameId,
          await this.userService.getPlayer(request, response),
        );
      } else {
        data = await this.engine.playerAction(
          gameId,
          action as Coordinates,
          await this.userService.getPlayer(request, response),
        );
      }
      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.NOT_FOUND).json(error.message);
    }
  }
}
