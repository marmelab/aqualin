import {
  calculateScore,
  Coordinates,
  GameState,
  initGameStateFromFile,
  initNewGameState,
  playTurn,
} from "@aqua/core";
import { Injectable } from "@nestjs/common";

import { Game } from "../types";

@Injectable()
export class EngineService {
  #game: Game;

  startGame = (id: number): Game => {
    const gameState: GameState = initGameStateFromFile(
      "../fixture/saved-game-state-example.json",
    );
    gameState.playerTurn = "Color";

    const playerOne = { name: "Norbert", role: "Color" };
    const playerTwo = { name: "Nanny", role: "Symbol" };
    this.#game = initGame(playerOne, playerTwo, gameState);
    return this.#game;
  };

  public startNewGame(): Game {
    //TODO  call rendernewGame
    const gameState: GameState = initNewGameState();
    gameState.playerTurn = "Color";
    const playerOne = { name: "Norbert", role: "Color" };
    const playerTwo = { name: "Nanny", role: "Symbol" };
    this.#game = initGame(playerOne, playerTwo, gameState);
    return this.#game;
  }

  public getAqualinGame(): Game {
    if (this.#game == null) {
      return this.startNewGame();
    }
    return this.#game;
  }

  public click(coordinates: Coordinates): Game {
    this.#game.message = null;
    try {
      this.#game.gameState = playTurn(
        this.#game.gameState,
        coordinates,
      ).gameState;
      if (this.#game.gameState.river.length === 0) {
        this.#game.score = calculateScore(this.#game.gameState);
      }
    } catch (e) {
      this.#game.message = e.message;
    }
    return this.#game;
  }
}

export const isPlayerTurn = (
  role: string,
  gameStatePlayerTurn: string,
): boolean => {
  return role === gameStatePlayerTurn;
};

export const initGame = (playerOne, playerTwo, gameState): Game => {
  return {
    playerOne: {
      name: playerOne.name,
      role: playerOne.role,
      turn: isPlayerTurn(playerOne.role, gameState.playerTurn),
    },
    playerTwo: {
      name: playerTwo.name,
      role: playerTwo.role,
      turn: isPlayerTurn(playerTwo.role, gameState.playerTurn),
    },
    gameState,
  };
};
