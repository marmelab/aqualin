import { MigrationInterface, QueryRunner } from "typeorm";

import { User } from "../../user/entities/user.entity";
import { AI_NAME } from "../../utils/ai";

export class AiPlayer1648730359874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User(AI_NAME, AI_NAME, "ai@aqualin.aqua");
    queryRunner.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
