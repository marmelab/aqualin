import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Hint1648474251768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("game", [
      new TableColumn({
        name: "colorHint",
        default: "'none'",
        type: "varchar",
      }),
      new TableColumn({
        name: "symbolHint",
        default: "'none'",
        type: "varchar",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
