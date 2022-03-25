import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addMailAndResetPasswordTokenColumns1648117767500
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "email",
        type: "varchar",
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "resetPasswordToken",
        type: "jsonb",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
