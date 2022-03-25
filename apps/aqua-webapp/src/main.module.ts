import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminModule } from "./admin/api.module";
import { ApiModule } from "./api/api.module";
import { BannedIpModule } from "./banned-ip/banned-ip.module";
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
    AdminModule,
    ApiModule,
    BannedIpModule,
    BoardModule,
    EngineModule,
    GameModule,
    RiverModule,
    SseModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get("MAIL_HOST"),
          port: "465",
          secure: true,
          auth: {
            user: configService.get("MAIL_USER"),
            pass: configService.get("MAIL_PASSWORD"),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get("MAIL_FROM")}>`,
        },
        template: {
          dir: process.cwd() + "/src/static/template/",
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
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
    consumer.apply(UserCookieMiddleWare).exclude("admin/*").forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
