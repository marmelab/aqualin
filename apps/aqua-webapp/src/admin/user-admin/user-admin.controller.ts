import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Game } from "src/game/entities/Game";
import { User } from "src/user/entities/user.entity";

import { JwtAuthAdminGuard } from "../auth/jwt-auth-admin.guard";
import { UserUpdatePatchInterceptor } from "./UserUpdateInterceptor";
import { UserAdminService } from "./user-admin.service";

@Crud({
  model: {
    type: Game,
  },
  query: {
    exclude: ["password", "resetPasswordToken"],
  },
  routes: {
    updateOneBase: {
      interceptors: [UserUpdatePatchInterceptor],
    },
  },
})
@UseGuards(JwtAuthAdminGuard)
@Controller("admin/api/users")
export class UserAdminController implements CrudController<User> {
  constructor(public service: UserAdminService) {}
}
