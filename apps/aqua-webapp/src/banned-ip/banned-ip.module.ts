import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BannedIpMiddleware } from "./banned-ip.middleware";
import { BannedIp } from "./entities/bannedIp.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BannedIp])],
  providers: [],
  exports: [],
})
export class BannedIpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BannedIpMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
