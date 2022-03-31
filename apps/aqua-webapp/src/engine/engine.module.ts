import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";

import { Game } from "../game/entities/Game";
import { SseModule } from "../sse/sse.module";
import { EngineService } from "./engine.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([User]),
    SseModule,
  ],
  controllers: [],
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}
