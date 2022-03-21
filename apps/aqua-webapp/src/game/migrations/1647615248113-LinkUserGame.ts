import bcrypt from "bcrypt";
import { User } from "src/user/entities/user.entity";
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class LinkUserGame1647615248113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const players: [{ player: string }] = await queryRunner.query(
      `SELECT 
  DISTINCT player 
FROM 
  (
    (
      SELECT 
        DISTINCT color as player 
      FROM 
        game 
      WHERE 
        color is not null
    ) 
    UNION 
    (
      SELECT 
        DISTINCT symbol as player 
      FROM 
        game 
      WHERE 
        symbol is not null
    )
  ) as players
 `,
    );
    await Promise.all(
      players.map(async (obj) => {
        const user = new User();
        user.password = await bcrypt.hash(obj.player, 10);
        user.username = obj.player;
        queryRunner.manager.save(User, user);
      }),
    );
    await queryRunner.addColumn(
      "game",
      new TableColumn({
        name: "colorId",
        type: "int",
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      "game",
      new TableColumn({
        name: "symbolId",
        type: "int",
        isNullable: true,
      }),
    );
    await queryRunner.query(
      `UPDATE game
SET "colorId" = "user".id
FROM "user"
WHERE game.color = "user".username;`,
    );
    await queryRunner.query(
      `UPDATE game
SET "symbolId" = "user".id
FROM "user"
WHERE game.symbol = "user".username;`,
    );
    await queryRunner.query(`ALTER TABLE game DROP COLUMN color;`);
    await queryRunner.query(`ALTER TABLE game DROP COLUMN symbol;`);
    await queryRunner.createForeignKey(
      "game",
      new TableForeignKey({
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        columnNames: ["colorId"],
      }),
    );
    await queryRunner.createForeignKey(
      "game",
      new TableForeignKey({
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        columnNames: ["symbolId"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
