import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Game } from "src/game/entities/Game";

import { GameAdminService } from "./game-admin.service";

@Crud({
  model: {
    type: Game,
  },
  query: {
    join: {
      color: {
        eager: true,
        exclude: ["password"],
      },
      symbol: {
        eager: true,
        exclude: ["password"],
      },
    },
  },
})
@Controller("api/admin/games")
export class GameAdminController implements CrudController<Game> {
  constructor(public service: GameAdminService) {}
}
