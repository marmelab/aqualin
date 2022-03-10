import {
  calculateScore,
  Coordinates,
  initGameStateFromFile,
  initNewGameState,
  playTurn,
} from "@aqua/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "src/game/entities/Game";
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

  async startGameFromFile(playerId: string): Promise<Game> {
    const game: Game = {
      id: null,
      gameState: initGameStateFromFile(
        "../fixture/saved-game-state-example.json",
      ),
      color: playerId,
      symbol: null,
    };
    game.gameState.playerTurn = "Color";
    return (await this.#gameRepository.save(game)) as GameTemplate;
  }

  async startNewGame(playerId: string): Promise<GameTemplate> {
    const game: Game = {
      id: null,
      gameState: initNewGameState(),
      color: null,
      symbol: null,
    };
    addFirstPlayer(game, playerId);
    return (await this.#gameRepository.save(game)) as GameTemplate;
  }

  async getAqualinGame(
    gameId: number,
    playerId: string,
  ): Promise<GameTemplate> {
    let game = (await this.#gameRepository.findOne(gameId)) as GameTemplate;
    if (
      !isGameHasTwoPlayers(game) &&
      !isPlayerIdIsPlayerColor(game, playerId) &&
      !isPlayerIdIsPlayerSymbol(game, playerId)
    ) {
      addSecondPlayer(game, playerId);
      game = await this.#gameRepository.save(game);
    }

    if (game.gameState.river.length === 0) {
      game.score = calculateScore(game.gameState);
    }
    game.isPlayerTurn = isPlayerTurn(game, playerId);
    return game;
  }

  async click(
    gameId: number,
    coordinates: Coordinates,
    playerId: string,
  ): Promise<GameTemplate> {
    let game = await this.getAqualinGame(gameId, playerId);
    if (
      (!isPlayerIdIsPlayerColor(game, playerId) &&
        !isPlayerIdIsPlayerSymbol(game, playerId)) ||
      !isPlayerTurn(game, playerId)
    ) {
      console.log(game, playerId);
      throw new Error("Forbidden");
    }
    try {
      game.gameState = playTurn(game.gameState, coordinates).gameState;
      game = await this.#gameRepository.save(game);
    } catch (e) {
      game.message = e.message;
    }
    return game;
  }
}

export const isPlayerTurn = (game: Game, playerId: string): boolean => {
  return (
    (game.gameState.playerTurn === "Color" &&
      isPlayerIdIsPlayerColor(game, playerId)) ||
    (game.gameState.playerTurn === "Symbol" &&
      isPlayerIdIsPlayerSymbol(game, playerId))
  );
};

export const isGameHasTwoPlayers = (game: Game): boolean => {
  return game.color !== null && game.symbol !== null;
};

export const isPlayerIdIsPlayerColor = (game: Game, playerId: string) => {
  return game.color === playerId;
};

export const isPlayerIdIsPlayerSymbol = (game: Game, playerId: string) => {
  return game.symbol === playerId;
};

function addFirstPlayer(game: GameTemplate, playerId: string) {
  //player 1 random color or symbol ?
  if (Math.round(Math.random()) === 1) {
    game.color = playerId;
  } else {
    game.symbol = playerId;
  }
}

function addSecondPlayer(game: GameTemplate, playerId: string) {
  if (game.color !== null) {
    game.symbol = playerId;
  } else {
    game.color = playerId;
  }
}
