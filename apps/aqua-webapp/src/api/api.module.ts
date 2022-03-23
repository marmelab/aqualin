import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { GameAdminModule } from "../admin/game-admin/game-admin.module";
import { GameApiModule } from "./game-api/game.api.module";

@Module({
  imports: [GameApiModule, AuthModule, GameAdminModule],
  controllers: [],
})
export class ApiModule {}
