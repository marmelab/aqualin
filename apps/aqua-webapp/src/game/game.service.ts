import { InjectRepository } from "@nestjs/typeorm";
import { verify } from "crypto";
import { SseService } from "src/sse/sse.service";
import { User } from "src/user/entities/user.entity";
import { Hint } from "src/utils/hint";
import { Repository } from "typeorm";

import { Game } from "./entities/Game";

export class GameService {
  #gameRepository: Repository<Game>;

  constructor(
    @InjectRepository(Game)
    gameRepository: Repository<Game>,
    private readonly sseService: SseService,
  ) {
    this.#gameRepository = gameRepository;
  }

  async updateHint(id: number, user: User, hint: string) {
    if (!this.verifyHint(hint)) {
      return;
    }
    const game = await this.#gameRepository.findOne({ id });
    if (game.color === user) {
      game.colorHint = hint as keyof typeof Hint;
    } else if (game.symbol === user) {
      game.symbolHint = hint as keyof typeof Hint;
    }
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
