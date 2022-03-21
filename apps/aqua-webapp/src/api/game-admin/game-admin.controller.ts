import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Request, Response } from "express";
import { EngineService } from "src/engine/engine.service";
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
