import {
  calculateScore,
  Coordinates,
  initGameStateFromFile,
  initNewGameState,
  Player,
  playTurn,
} from "@aqua/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Game } from "../game/entities/Game";
import { SseService } from "../sse/sse.service";
import { GameTemplate } from "../types";

@Injectable()
export class EngineService {
  #gameRepository: Repository<Game>;

  constructor(
    @InjectRepository(Game)
    gameRepository: Repository<Game>,
    private readonly sseService: SseService,
  ) {
    this.#gameRepository = gameRepository;
  }

  async startGameFromFile(playerId: string): Promise<Game> {
    const game: Game = {
      id: null,
      gameState: initGameStateFromFile(
        "../../fixture/saved-game-state-example.json",
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

  async loadAndUpdateAqualinGame(
    gameId: number,
    playerId?: string,
  ): Promise<GameTemplate> {
    let game = (await this.#gameRepository.findOne(gameId)) as GameTemplate;
    if (isGameWitness(game, playerId)) {
      if (game.gameState.river.length === 0) {
        game.score = calculateScore(game.gameState);
      }
      game.isWitnessGame = true;
      return game;
    }
    if (
      playerId &&
      !gameHasTwoPlayers(game) &&
      !isPlayerIdColor(game, playerId) &&
      !isPlayerIdSymbol(game, playerId)
    ) {
      addSecondPlayer(game, playerId);
      game = await this.#gameRepository.save(game);
    }

    if (game.gameState.river.length === 0) {
      game.score = calculateScore(game.gameState);
    }
    game.isPlayerTurn = isPlayerTurn(game, playerId);
    game.team = getPlayerTeam(game, playerId);
    return game;
  }

  async playerAction(
    gameId: number,
    coordinates: Coordinates,
    playerId: string,
  ): Promise<GameTemplate> {
    let game = await this.loadAndUpdateAqualinGame(gameId, playerId);
    if (
      (!isPlayerIdColor(game, playerId) && !isPlayerIdSymbol(game, playerId)) ||
      !isPlayerTurn(game, playerId)
    ) {
      throw new Error("Forbidden");
    }
    try {
      const turn = playTurn(game.gameState, coordinates);
      game.gameState = turn.gameState;
      game = await this.#gameRepository.save(game);
      if (!turn.transcientGamestate) {
        this.sseService.newGameEvent(game.id);
      }
    } catch (e) {
      game.message = e.message;
    }
    return game;
  }
}

export const isPlayerTurn = (game: Game, playerId: string): boolean => {
  return (
    (game.gameState.playerTurn === "Color" &&
      isPlayerIdColor(game, playerId)) ||
    (game.gameState.playerTurn === "Symbol" && isPlayerIdSymbol(game, playerId))
  );
};

export const getPlayerTeam = (game: Game, playerId: string): Player => {
  if (game.color === playerId) {
    return "Color";
  } else if (game.symbol === playerId) {
    return "Symbol";
  }
  return null;
};

export const gameHasTwoPlayers = (game: Game): boolean => {
  return game.color !== null && game.symbol !== null;
};

export const isPlayerIdColor = (game: Game, playerId: string) => {
  return game.color === playerId;
};

export const isPlayerIdSymbol = (game: Game, playerId: string) => {
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

export const isGameWitness = (
  game: GameTemplate,
  playerId: string,
): boolean => {
  return (
    gameHasTwoPlayers(game) &&
    !isPlayerIdColor(game, playerId) &&
    !isPlayerIdSymbol(game, playerId)
  );
};
