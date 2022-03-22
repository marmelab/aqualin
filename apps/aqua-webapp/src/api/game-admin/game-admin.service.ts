import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Game } from "src/game/entities/Game";

@Injectable()
export class GameAdminService extends TypeOrmCrudService<Game> {
  constructor(@InjectRepository(Game) repo) {
    super(repo);
  }
}
