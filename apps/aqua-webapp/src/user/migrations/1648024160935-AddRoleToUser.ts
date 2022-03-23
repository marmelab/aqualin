import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleToUser1648024160935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "admin",
        type: "bool",
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
