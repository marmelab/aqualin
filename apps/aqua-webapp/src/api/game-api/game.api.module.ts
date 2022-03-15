import { Module } from "@nestjs/common";

import { EngineModule } from "../../engine/engine.module";
import { GameApiController } from "./game.api.controller";

@Module({
  imports: [EngineModule],
  controllers: [GameApiController],
})
export class GameApiModule {}
