import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "src/game/entities/Game";

import { GameAdminController } from "./game-admin.controller";
import { GameAdminService } from "./game-admin.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameAdminService],
  exports: [GameAdminService],
  controllers: [GameAdminController],
})
export class GameAdminModule {}
