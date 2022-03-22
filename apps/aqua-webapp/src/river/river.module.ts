import { Module } from "@nestjs/common";
import { EngineModule } from "../engine/engine.module";
import { RiverController } from "./river.contoller";

@Module({
  imports: [EngineModule],
  controllers: [RiverController],
})
export class RiverModule {}
