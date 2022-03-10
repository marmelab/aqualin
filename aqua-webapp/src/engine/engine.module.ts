import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Game } from "../entities/GameEntity";
import { EngineService } from "./engine.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [],
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}
