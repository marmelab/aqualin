import { Module } from "@nestjs/common";

import { EngineModule } from "../engine/engine.module";
import { BoardController } from "./board.controller";

@Module({
  imports: [EngineModule],
  controllers: [BoardController],
})
export class BoardModule {}
