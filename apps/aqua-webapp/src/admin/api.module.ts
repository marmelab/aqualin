import { Module } from "@nestjs/common";

import { AuthAdminModule } from "./auth/auth-admin.module";
import { BannedIpAdminModule } from "./bannedIp-admin/banned-ip-admin.module";
import { GameAdminModule } from "./game-admin/game-admin.module";
import { UserAdminModule } from "./user-admin/user-admin.module";

@Module({
  imports: [
    AuthAdminModule,
    BannedIpAdminModule,
    GameAdminModule,
    UserAdminModule,
  ],
  controllers: [],
})
export class AdminModule {}
