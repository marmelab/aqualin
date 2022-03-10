import { Module } from "@nestjs/common";
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
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST || "localhost",
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "postgres",
      database: process.env.DATABASE_DATABASE || "postgres",
      autoLoadEntities: true,
      entities: ["*/entities/*"],
      synchronize: true,
    }),
  ],
  controllers: [GameController],
})
export class MainModule {}
