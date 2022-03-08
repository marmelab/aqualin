import { GameState } from "@aqua/core";
import { Controller, Get, Render } from "@nestjs/common";

import { WebappService } from "./webapp.service";

@Controller()
export class WebappController {
  constructor(private readonly webappService: WebappService) {}

  @Get()
  @Render("aqualinGameView")
  getAqualinGame(): {
    playerOne: { name: string; role: string; turn: boolean };
    playerTwo: { name: string; role: string; turn: boolean };
    gameState: GameState;
  } {
    return this.webappService.getAqualinGame();
  }
}
