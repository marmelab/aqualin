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
        name: "tmpco",
        type: "int",
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      "game",
      new TableColumn({
        name: "tmpsy",
        type: "int",
        isNullable: true,
      }),
    );
    await queryRunner.query(
      `UPDATE game
SET tmpco = "user".id
FROM "user"
WHERE game.color = "user".username;`,
    );
    await queryRunner.query(
      `UPDATE game
SET tmpsy = "user".id
FROM "user"
WHERE game.symbol = "user".username;`,
    );
    await queryRunner.query(`ALTER TABLE game DROP COLUMN color;`);
    await queryRunner.query(`ALTER TABLE game DROP COLUMN symbol;`);
    await queryRunner.query(`ALTER TABLE game RENAME tmpco to color;`);
    await queryRunner.query(`ALTER TABLE game RENAME tmpsy to symbol;`);
    await queryRunner.createForeignKey(
      "game",
      new TableForeignKey({
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        columnNames: ["color"],
      }),
    );
    await queryRunner.createForeignKey(
      "game",
      new TableForeignKey({
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        columnNames: ["symbol"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
