import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AiDifficulty1648734698200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "game",
      new TableColumn({
        name: "difficulty",
        type: "varchar",
        default: "'player'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
