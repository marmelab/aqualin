import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";

import { UserApiController } from "./user.api.controller";

@Module({ imports: [UserModule], controllers: [UserApiController] })
export class UserApiModule {}
