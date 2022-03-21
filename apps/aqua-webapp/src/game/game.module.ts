import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";

import { EngineModule } from "../engine/engine.module";
import { Game } from "./entities/Game";
import { GameController } from "./game.controller";

@Module({
  imports: [EngineModule, UserModule, TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
})
export class GameModule {}
