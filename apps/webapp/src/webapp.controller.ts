import { Controller, Get, Render } from "@nestjs/common";

import { WebappService } from "./webapp.service";

@Controller()
export class WebappController {
  constructor(private readonly webappService: WebappService) {}

  @Get()
  @Render("aqualinGameView")
  getAqualinGame(): {
    playerOne: { name: string; role: string };
    playerTwo: { name: string; role: string };
    board: Array<Array<string | null>>;
    river: Array<string | null>;
  } {
    return this.webappService.getAqualinGame();
  }
}
