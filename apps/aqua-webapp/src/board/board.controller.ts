import { Controller, Get, Param, ParseIntPipe, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "src/user/user.service";

import { EngineService } from "../engine/engine.service";

@Controller()
export class BoardController {
  constructor(
    private readonly engine: EngineService,
    private readonly userService: UserService,
  ) {}

  @Get("/game/:gameId/board/:row/:column")
  async clickBoard(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Param("row", ParseIntPipe) row: number,
    @Param("column", ParseIntPipe) column: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.engine.playerAction(
      gameId,
      { row, column },
      await this.userService.getPlayer(request, response),
    );
    response.redirect(`/game/${gameId}`);
  }
}
