import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "src/user/user.service";

import { EngineService } from "../engine/engine.service";

@Controller()
export class RiverController {
  constructor(
    private readonly engine: EngineService,
    private readonly userService: UserService,
  ) {}

  @Get("/game/:gameId/river/:index")
  async clickBoard(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Param("index", ParseIntPipe) index: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.engine.playerAction(
      gameId,
      { row: null, column: index },
      await this.userService.getPlayer(request, response),
    );
    response.redirect(`/game/${gameId}`);
  }
}
