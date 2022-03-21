import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";

import { EngineModule } from "../engine/engine.module";
import { BoardController } from "./board.controller";

@Module({
  imports: [EngineModule, UserModule],
  controllers: [BoardController],
})
export class BoardModule {}
