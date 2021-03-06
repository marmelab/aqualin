import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Game } from "src/game/entities/Game";
import { Repository } from "typeorm";

@Injectable()
export class GameAdminService extends TypeOrmCrudService<Game> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(@InjectRepository(Game) repo: Repository<Game>) {
    super(repo);
  }
}
