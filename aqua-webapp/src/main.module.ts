import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BoardModule } from "./board/board.module";
import { EngineModule } from "./engine/engine.module";
import { GameController } from "./game/game.controller";
import { GameModule } from "./game/game.module";
import { RiverModule } from "./river/river.module";

@Module({
  imports: [
    BoardModule,
    RiverModule,
    EngineModule,
    GameModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        host: configService.get("DATABASE_HOST"),
        port: parseInt(configService.get("DATABASE_PORT")),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_DATABASE") as string,
        autoLoadEntities: true,
        entities: ["*/entities/*"],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GameController],
})
export class MainModule {}
