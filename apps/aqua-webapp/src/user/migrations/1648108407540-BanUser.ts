import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class BanUser1648108407540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "banned",
        type: "bool",
        default: false,
      }),
    );
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "ipAddress",
        type: "varchar",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
