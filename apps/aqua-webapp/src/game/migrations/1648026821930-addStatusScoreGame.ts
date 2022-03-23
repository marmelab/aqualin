import { calculateScore } from "@aqua/core";
import { gameHasTwoPlayers } from "src/engine/engine.service";
import { Status } from "src/utils/status";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

import { Game } from "../entities/Game";

//add status column and score column to game entity

export class addStatusScoreGame1648026821930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "game",
      new TableColumn({
        name: "status",
        type: "varchar",
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      "game",
      new TableColumn({
        name: "score",
        type: "jsonb",
        isNullable: true,
      }),
    );
    const games: Game[] = await queryRunner.manager.find(Game);

    await Promise.all(
      games.map(async (game) => {
        if (game.gameState.river.length === 0) {
          game.score = calculateScore(game.gameState);
          game.status = Status.over;
        } else if (gameHasTwoPlayers(game)) {
          game.status = Status.inProgress;
        } else {
          game.status = Status.waitingSecondPlayer;
        }
        queryRunner.manager.save(Game, game);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
