import { MigrationInterface, QueryRunner } from "typeorm";

import { User } from "../../user/entities/user.entity";
import { IA_NAME } from "../../utils/ia";

export class AiPlayer1648730359874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User(IA_NAME, IA_NAME, "ia@aqualin.aqua");
    queryRunner.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
