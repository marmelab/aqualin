import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SseModule } from "src/sse/sse.module";

import { Game } from "../game/entities/Game";
import { EngineService } from "./engine.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game]), SseModule],
  controllers: [],
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}
