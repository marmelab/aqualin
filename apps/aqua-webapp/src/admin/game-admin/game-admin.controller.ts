import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Game } from "src/game/entities/Game";

import { JwtAuthAdminGuard } from "../auth/jwt-auth-admin.guard";
import { GameAdminService } from "./game-admin.service";

@Crud({
  model: {
    type: Game,
  },
})
@UseGuards(JwtAuthAdminGuard)
@Controller("admin/api/games")
export class GameAdminController implements CrudController<Game> {
  constructor(public service: GameAdminService) {}
}
