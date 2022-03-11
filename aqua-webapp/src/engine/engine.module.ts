import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Game } from "../game/entities/Game";
import { EngineService } from "./engine.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [],
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}
