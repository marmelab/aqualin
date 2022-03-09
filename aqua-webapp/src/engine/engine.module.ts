import { Module } from "@nestjs/common";

import { EngineService } from "./engine.service";

@Module({
  imports: [],
  controllers: [],
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}
