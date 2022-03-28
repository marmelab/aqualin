import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Hint } from "src/utils/hint";
import { Repository } from "typeorm";

import { Game } from "./entities/Game";

export class GameService {
  #gameRepository: Repository<Game>;

  constructor(
    @InjectRepository(Game)
    gameRepository: Repository<Game>,
  ) {
    this.#gameRepository = gameRepository;
  }

  async updateHint(gameId: number, user: User, hint: string) {
    if (!this.verifyHint(hint)) {
      return;
    }
    const game = await this.#gameRepository.findOne({ id: gameId });
    if (game.color.id === user.id) {
      game.colorHint = hint as keyof typeof Hint;
    } else if (game.symbol.id === user.id) {
      game.symbolHint = hint as keyof typeof Hint;
    }
    await this.#gameRepository.save(game);
  }

  verifyHint(toCheck: string) {
    for (const hint in Hint) {
      if (hint === toCheck) {
        return true;
      }
    }
    return false;
  }
}
