import {
  calculateScore,
  Coordinates,
  GameState,
  initGameStateFromFile,
  initNewGameState,
  playDumbAiTurn,
  Player,
  PlayerColor,
  PlayerSymbol,
  playMinMaxIaTurn,
  playTurn,
} from "@aqua/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DIFFICULTY_DUMB } from "src/utils/ai";
import { Status } from "src/utils/status";
import { Repository } from "typeorm";

import { Game } from "../game/entities/Game";
import { SseService } from "../sse/sse.service";
import { GameTemplate } from "../types";
import { User } from "../user/entities/user.entity";
import { addHints, getOpponent, getPlayer } from "./hints";

@Injectable()
export class EngineService {
  readonly #gameRepository: Repository<Game>;
  readonly #userRepository: Repository<User>;

  constructor(
    @InjectRepository(Game)
    gameRepository: Repository<Game>,
    @InjectRepository(User)
    userRepository: Repository<User>,
    private readonly sseService: SseService,
  ) {
    this.#gameRepository = gameRepository;
    this.#userRepository = userRepository;
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
      difficulty: "",
      exploredPossibilities: 0,
    };
    game.gameState.playerTurn = PlayerColor;
    return (await this.#gameRepository.save(game)) as GameTemplate;
  }

  async #startNewGame(user: User): Promise<Game> {
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
      difficulty: "player",
      exploredPossibilities: 0,
    };
    addFirstPlayer(game, user);
    return game;
  }

  async startNewGameAgainstPlayer(user: User): Promise<GameTemplate> {
    const game = await this.#startNewGame(user);
    const gameTemplate = (await this.#gameRepository.save(
      game,
    )) as GameTemplate;
    gameTemplate.playerTeam = getPlayerTeam(game, user);
    gameTemplate.isPlayerTurn = isPlayerTurn(game, user);
    return gameTemplate;
  }

  async startNewGameAgainstIa(
    user: User,
    difficulty: string,
  ): Promise<GameTemplate> {
    const game = await this.#startNewGame(user);
    addSecondPlayer(game, this.#userRepository.find({ username: "IA" })[0]);
    game.difficulty = difficulty;
    const gameTemplate = (await this.#gameRepository.save(
      game,
    )) as GameTemplate;
    gameTemplate.playerTeam = getPlayerTeam(game, user);
    gameTemplate.isPlayerTurn = isPlayerTurn(game, user);
    if (!isPlayerTurn(game, user)) {
      this.doAiTurn(gameTemplate);
    }
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
      this.saveAction(game);
    } catch (e) {
      game.message = e.message;
    }
    if (!isPlayerTurn(game, user)) {
      this.doAiTurn(game);
    }
    return game;
  }

  async doAiTurn(game: GameTemplate) {
    if (game.difficulty === DIFFICULTY_DUMB) {
      playDumbAiTurn(
        game.gameState,
        getOpponent(game),
        async (action: GameState) => {
          game.gameState = action;
          await this.saveAction(game);
        },
      );
    } else {
      playMinMaxIaTurn(
        game.gameState,
        getOpponent(game),
        getPlayer(game),
        async (action: GameState, exploredPossibilities: number) => {
          game.gameState = action;
          game.exploredPossibilities = exploredPossibilities;
          await this.saveAction(game);
        },
      );
    }
  }

  async saveAction(game: Game) {
    game.nbActions++;
    game = await this.#gameRepository.save(game);
    this.sseService.newGameEvent(game.id, game.nbActions);
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
