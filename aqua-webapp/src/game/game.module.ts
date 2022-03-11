import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EngineModule } from "../engine/engine.module";
import { SseModule } from "../sse/sse.module";
import { Game } from "./entities/Game";
import { GameController } from "./game.controller";

@Module({
  imports: [EngineModule, SseModule, TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
})
export class GameModule {}
