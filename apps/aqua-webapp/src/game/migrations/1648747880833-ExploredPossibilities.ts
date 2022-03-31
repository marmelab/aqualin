import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ExploredPossibilities1648747880833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "game",
      new TableColumn({
        name: "exploredPossibilities",
        type: "int",
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
