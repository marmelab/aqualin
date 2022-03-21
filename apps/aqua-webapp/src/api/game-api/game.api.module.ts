import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";

import { EngineModule } from "../../engine/engine.module";
import { GameApiController } from "./game.api.controller";

@Module({
  imports: [EngineModule, UserModule],
  controllers: [GameApiController],
})
export class GameApiModule {}
