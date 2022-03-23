import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";

import { AuthAdminController } from "./auth-admin.controller";
import { AuthAdminService } from "./auth-admin.service";
import { JwtAdminStrategy } from "./jwt-admin.strategy";
import { LocalAdminStrategy } from "./local-admin.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secretKey",
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [AuthAdminService, LocalAdminStrategy, JwtAdminStrategy],
  controllers: [AuthAdminController],
})
export class AuthAdminModule {}
