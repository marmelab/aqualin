import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class BannedIps1648125036179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "banned_ip",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "int",
            isGenerated: true,
            generatedIdentity: "BY DEFAULT",
          },
          {
            name: "ipAddress",
            type: "varchar",
          },
        ],
      }),
      true,
      false,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
