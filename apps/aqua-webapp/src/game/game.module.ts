import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EngineModule } from "../engine/engine.module";
import { Game } from "./entities/Game";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";

@Module({
  imports: [EngineModule, TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
