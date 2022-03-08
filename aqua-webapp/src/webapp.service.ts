import { GameState, initGameStateFromFile } from "@aqua/core";
import { Injectable } from "@nestjs/common";

import { Game } from "./webapp.controller";

@Injectable()
export class WebappService {
  #game: Game;

  startNewGame = (): {
    playerOne: { name: string; role: string; turn: boolean };
    playerTwo: { name: string; role: string; turn: boolean };
    gameState: GameState;
  } => {
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
}

export const isPlayerTurn = (
  role: string,
  gameStatePlayerTurn: string,
): boolean => {
  return role === gameStatePlayerTurn;
};
