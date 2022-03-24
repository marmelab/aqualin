import { MigrationInterface, QueryRunner } from "typeorm";

import { User } from "../entities/user.entity";

export class AddRoleToAdmin1648059043604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const admins = await queryRunner.manager.find<User>("user", {
      username: "admin",
    });
    if (admins.length === 0) {
      throw new Error("Admin account not found");
    }
    const user = admins[0];
    user.admin = true;
    queryRunner.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
