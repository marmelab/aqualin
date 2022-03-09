import { Module } from "@nestjs/common";

import { BoardController } from "./board.controller";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";

@Module({
  imports: [],
  controllers: [GameController, BoardController],
  providers: [GameService],
})
export class WebappModule {}
