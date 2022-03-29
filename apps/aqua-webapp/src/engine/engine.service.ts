import {
  calculateScore,
  Coordinates,
  initGameStateFromFile,
  initNewGameState,
  Player,
  PlayerColor,
  PlayerSymbol,
  playTurn,
} from "@aqua/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Status } from "src/utils/status";
import { Repository } from "typeorm";

import { Game } from "../game/entities/Game";
import { SseService } from "../sse/sse.service";
import { GameTemplate } from "../types";
import { User } from "../user/entities/user.entity";
import { addHints } from "./hints";

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

  findOpenGames = (): Promise<Game[]> => {
    return this.#gameRepository
      .createQueryBuilder("game")
      .where("game.color is null OR game.symbol is null")
      .getMany();
  };

  async startGameFromFile(user: User): Promise<Game> {
    const game: Game = {
      id: null,
      gameState: initGameStateFromFile(
        "../../fixture/saved-game-state-example.json",
      ),
      color: user,
      symbol: null,
      nbActions: 0,
      status: Status.waitingSecondPlayer,
      score: null,
      colorHint: "none",
      symbolHint: "none",
    };
    game.gameState.playerTurn = PlayerColor;
    return (await this.#gameRepository.save(game)) as GameTemplate;
  }

  async startNewGame(user: User): Promise<GameTemplate> {
    const game: Game = {
      id: null,
      gameState: initNewGameState(),
      color: null,
      symbol: null,
      nbActions: 0,
      status: Status.waitingSecondPlayer,
      score: null,
      colorHint: "none",
      symbolHint: "none",
    };
    addFirstPlayer(game, user);
    const gameTemplate = (await this.#gameRepository.save(
      game,
    )) as GameTemplate;
    gameTemplate.playerTeam = getPlayerTeam(game, user);
    gameTemplate.isPlayerTurn = isPlayerTurn(game, user);
    return gameTemplate;
  }

  async loadAndUpdateAqualinGame(
    gameId: number,
    user?: User,
  ): Promise<GameTemplate> {
    let game = (await this.#gameRepository.findOne(gameId)) as GameTemplate;
    if (!game) {
      throw new Error("This game doesn't exist.");
    }
    if (isGameWitness(game, user)) {
      if (game.gameState.river.length === 0) {
        game.score = calculateScore(game.gameState);
      }
      game.isWitnessGame = true;
      return game;
    }
    if (
      user &&
      !gameHasTwoPlayers(game) &&
      !isPlayerColor(game, user) &&
      !isPlayerSymbol(game, user)
    ) {
      addSecondPlayer(game, user);
      game = await this.#gameRepository.save(game);
    }

    if (game.gameState.river.length === 0) {
      game.score = calculateScore(game.gameState);
      game.status = Status.over;
      game = await this.#gameRepository.save(game);
    }
    game.isPlayerTurn = isPlayerTurn(game, user);
    game.playerTeam = getPlayerTeam(game, user);
    addHints(game);
    return game;
  }

  async playerAction(
    gameId: number,
    coordinates: Coordinates,
    user: User,
  ): Promise<GameTemplate> {
    let game = await this.loadAndUpdateAqualinGame(gameId, user);
    if (!game) {
      throw new Error("This game doesn't exist.");
    }
    if (
      (!isPlayerColor(game, user) && !isPlayerSymbol(game, user)) ||
      !isPlayerTurn(game, user)
    ) {
      throw new Error("Forbidden");
    }
    try {
      const turn = playTurn(game.gameState, coordinates);
      game.gameState = turn.gameState;
      game.nbActions++;
      game = await this.#gameRepository.save(game);
      this.sseService.newGameEvent(game.id, game.nbActions);
    } catch (e) {
      game.message = e.message;
    }
    return game;
  }
}

export const isPlayerTurn = (game: Game, user: User): boolean => {
  if (!user) {
    return false;
  }
  return (
    (game.gameState.playerTurn === PlayerColor && isPlayerColor(game, user)) ||
    (game.gameState.playerTurn === PlayerSymbol && isPlayerSymbol(game, user))
  );
};

export const getPlayerTeam = (game: Game, user: User): Player => {
  if (!user) {
    return null;
  }
  if (game.color?.id === user?.id) {
    return PlayerColor;
  } else if (game.symbol?.id === user?.id) {
    return PlayerSymbol;
  }
  return null;
};

export const gameHasTwoPlayers = (game: Game): boolean => {
  return game.color != null && game.symbol != null;
};

export const isPlayerColor = (game: Game, user: User) => {
  if (!user) {
    return false;
  }
  return game.color?.id === user?.id;
};

export const isPlayerSymbol = (game: Game, user: User) => {
  if (!user) {
    return false;
  }
  return game.symbol?.id === user?.id;
};

function addFirstPlayer(game: GameTemplate, user: User) {
  //player 1 random color or symbol ?
  if (Math.round(Math.random()) === 1) {
    game.color = user;
  } else {
    game.symbol = user;
  }
}

function addSecondPlayer(game: GameTemplate, user: User) {
  if (game.color != null) {
    game.symbol = user;
  } else {
    game.color = user;
  }
  game.status = Status.inProgress;
}

export const isGameWitness = (game: GameTemplate, user: User): boolean => {
  return (
    gameHasTwoPlayers(game) &&
    !isPlayerColor(game, user) &&
    !isPlayerSymbol(game, user)
  );
};
