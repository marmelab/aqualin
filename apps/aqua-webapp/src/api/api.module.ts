import { Module } from "@nestjs/common";

import { GameAdminModule } from "../admin/game-admin/game-admin.module";
import { AuthModule } from "./auth/auth.module";
import { GameApiModule } from "./game-api/game.api.module";
import { MailModule } from "./mail/mail.module";
import { UserApiModule } from "./user.api/user.api.module";

@Module({
  imports: [
    GameApiModule,
    AuthModule,
    GameAdminModule,
    MailModule,
    UserApiModule,
  ],
  controllers: [],
})
export class ApiModule {}
