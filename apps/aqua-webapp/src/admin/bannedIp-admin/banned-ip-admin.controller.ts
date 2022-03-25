import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { BannedIp } from "src/banned-ip/entities/bannedIp.entity";

import { JwtAuthAdminGuard } from "../auth/jwt-auth-admin.guard";
import { VerifyIpInterceptor } from "./VerifyIpInterceptor";
import { BannedIpAdminService } from "./banned-ip-admin.service";

@Crud({
  model: {
    type: BannedIp,
  },
  routes: {
    createOneBase: {
      interceptors: [VerifyIpInterceptor],
    },
  },
})
@UseGuards(JwtAuthAdminGuard)
@Controller("admin/api/bannedIps")
export class BannedIpAdminController implements CrudController<BannedIp> {
  constructor(public service: BannedIpAdminService) {}
}
