import { Module } from "@nestjs/common";

import { GameApiModule } from "./game-api/game.api.module";

@Module({
  imports: [GameApiModule],
  controllers: [],
})
export class ApiModule {}
