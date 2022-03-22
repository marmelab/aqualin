import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EngineModule } from "../engine/engine.module";
import { Game } from "./entities/Game";
import { GameController } from "./game.controller";

@Module({
  imports: [EngineModule, TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
})
export class GameModule {}
