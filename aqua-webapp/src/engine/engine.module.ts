import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Game } from "../game/entities/Game";
import { SseModule } from "../sse/sse.module";
import { EngineService } from "./engine.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game]), SseModule],
  controllers: [],
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}
