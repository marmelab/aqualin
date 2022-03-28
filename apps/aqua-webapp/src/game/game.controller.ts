import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/user/entities/user.entity";
import { UserCookie } from "src/user/user-cookie.decorator";

import { EngineService } from "../engine/engine.service";
import { GameTemplate } from "../types";
import { GameService } from "./game.service";

@Controller()
export class GameController {
  constructor(
    private readonly engine: EngineService,
    private readonly gameService: GameService,
  ) {}

  @Get()
  @Render("homePage")
  homePage() {
    return {};
  }

  @Post("/new")
  async startNewGame(
    @UserCookie() player: User,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const game = await this.engine.startNewGame(player);
    response.redirect(`/game/${game.id}`);
  }

  @Post("/startGameFromFile")
  async startGame(
    @UserCookie() player: User,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const game = await this.engine.startGameFromFile(player);
    response.redirect(`/game/${game.id}`);
  }

  @Get("/game/:gameId")
  @Render("aqualinGameView")
  async showGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @UserCookie() player: User,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<GameTemplate> {
    return this.engine.loadAndUpdateAqualinGame(gameId, player);
  }

  @Post("/game/:gameId/showHint")
  async showHint(
    @Param("gameId", ParseIntPipe) gameId: number,
    @UserCookie() player: User,
    @Res() response: Response,
    @Req() request: Request,
    @Body() body: { hint: string },
  ) {
    await this.gameService.updateHint(gameId, player, body.hint);
    response.redirect(`/game/${gameId}`);
  }
}
