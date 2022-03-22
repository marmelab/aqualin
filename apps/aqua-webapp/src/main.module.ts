import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApiModule } from "./api/api.module";
import { BoardModule } from "./board/board.module";
import { EngineModule } from "./engine/engine.module";
import { GameController } from "./game/game.controller";
import { GameModule } from "./game/game.module";
import { RiverModule } from "./river/river.module";
import { SseModule } from "./sse/sse.module";
import { UserCookieMiddleWare } from "./user/user-cookie.middleware";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ApiModule,
    BoardModule,
    RiverModule,
    EngineModule,
    GameModule,
    SseModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST"),
        port: parseInt(configService.get("DATABASE_PORT"), 10),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_DATABASE") as string,
        autoLoadEntities: true,
        entities: ["*/entities/*"],
        migrations: ["*/migrations/*"],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GameController],
})
export class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserCookieMiddleWare).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
