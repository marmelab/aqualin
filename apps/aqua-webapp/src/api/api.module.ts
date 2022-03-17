import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { GameApiModule } from "./game-api/game.api.module";

@Module({
  imports: [GameApiModule, AuthModule],
  controllers: [],
})
export class ApiModule {}
