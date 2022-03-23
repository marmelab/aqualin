import { Module } from "@nestjs/common";

import { AuthAdminModule } from "./auth/auth-admin.module";
import { GameAdminModule } from "./game-admin/game-admin.module";

@Module({
  imports: [GameAdminModule, AuthAdminModule],
  controllers: [],
})
export class AdminModule {}
