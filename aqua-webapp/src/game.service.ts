import {
  Coordinates,
  GameState,
  initGameStateFromFile,
  playTurn,
} from "@aqua/core";
import { Injectable } from "@nestjs/common";

import { Game } from "./types";

@Injectable()
export class GameService {
  #game: Game;

  startNewGame = (): Game => {
    const gameState: GameState = initGameStateFromFile(
      "../fixture/saved-game-state-example.json",
    );

    const playerOne = { name: "Norbert", role: "Color" };
    const playerTwo = { name: "Nanny", role: "Symbol" };
    this.#game = {
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
    return this.#game;
  };

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
