import {
  calculateScore,
  Coordinates,
  initGameStateFromFile,
  initNewGameState,
  playTurn,
} from "@aqua/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "src/entities/GameEntity";
import { Repository } from "typeorm";

import { GameTemplate } from "../types";

@Injectable()
export class EngineService {
  #gameRepository: Repository<Game>;

  constructor(
    @InjectRepository(Game)
    gameRepository: Repository<Game>,
  ) {
    this.#gameRepository = gameRepository;
  }

  async startGameFromFile(): Promise<Game> {
    const game: Game = {
      id: null,
      gameState: initGameStateFromFile(
        "../fixture/saved-game-state-example.json",
      ),
      color: null,
      symbol: null,
    };
    game.gameState.playerTurn = "Color";
    return (await this.#gameRepository.save(game)) as GameTemplate;
  }

  async startNewGame(): Promise<GameTemplate> {
    const game: Game = {
      id: null,
      gameState: initNewGameState(),
      color: null,
      symbol: null,
    };
    return (await this.#gameRepository.save(game)) as GameTemplate;
  }

  async getAqualinGame(gameId: number): Promise<GameTemplate> {
    const game = (await this.#gameRepository.findOne(gameId)) as GameTemplate;
    if (game.gameState.river.length === 0) {
      game.score = calculateScore(game.gameState);
    }
    return game;
  }

  async click(gameId: number, coordinates: Coordinates): Promise<GameTemplate> {
    let game = await this.getAqualinGame(gameId);
    try {
      game.gameState = playTurn(game.gameState, coordinates).gameState;
      game = await this.#gameRepository.save(game);
    } catch (e) {
      game.message = e.message;
    }
    return game;
  }
}

export const isPlayerTurn = (
  role: string,
  gameStatePlayerTurn: string,
): boolean => {
  return role === gameStatePlayerTurn;
};
