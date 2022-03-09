import { Module } from "@nestjs/common";

import { BoardModule } from "./board/board.module";
import { EngineModule } from "./engine/engine.module";
import { GameController } from "./game.controller";
import { RiverModule } from "./river/river.module";

@Module({
  imports: [BoardModule, RiverModule, EngineModule],
  controllers: [GameController],
})
export class GameModule {}
