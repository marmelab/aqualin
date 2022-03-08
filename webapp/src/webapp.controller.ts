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
    board: Array<Array<string | null>>;
    river: Array<string | null>;
  } {
    return this.webappService.getAqualinGame();
  }
}
