import {
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
import { UserService } from "src/user/user.service";

import { EngineService } from "../engine/engine.service";
import { GameTemplate } from "../types";

@Controller()
export class GameController {
  constructor(
    private readonly engine: EngineService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Render("homePage")
  homePage() {
    return {};
  }

  @Post("/new")
  async startNewGame(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const game = await this.engine.startNewGame(
      await this.userService.getPlayer(request, response),
    );

    response.redirect(`/game/${game.id}`);
  }

  @Post("/startGameFromFile")
  async startGame(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const game = await this.engine.startGameFromFile(
      await this.userService.getPlayer(request, response),
    );
    response.redirect(`/game/${game.id}`);
  }

  @Get("/game/:gameId")
  @Render("aqualinGameView")
  async showGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<GameTemplate> {
    return this.engine.loadAndUpdateAqualinGame(
      gameId,
      await this.userService.getPlayer(request, response),
    );
  }
}
