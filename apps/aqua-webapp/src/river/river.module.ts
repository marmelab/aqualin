import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";

import { EngineModule } from "../engine/engine.module";
import { RiverController } from "./river.contoller";

@Module({
  imports: [EngineModule, UserModule],
  controllers: [RiverController],
})
export class RiverModule {}
