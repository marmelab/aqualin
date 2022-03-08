import { Injectable } from "@nestjs/common";
import { GameState } from "aqua-core";

@Injectable()
export class WebappService {
  getAqualinGame = (): {
    playerOne: { name: string; role: string; turn: boolean };
    playerTwo: { name: string; role: string; turn: boolean };
    gameState: GameState;
  } => {
    const gameState: GameState = {
      board: [
        [
          { color: 1, symbol: 1 },
          null,
          { color: 2, symbol: 2 },
          { color: 1, symbol: 1 },
          null,
          { color: 2, symbol: 2 },
        ],
        [
          null,
          { color: 1, symbol: 3 },
          { color: 3, symbol: 3 },
          { color: 4, symbol: 4 },
          null,
          { color: 4, symbol: 5 },
        ],
        [
          { color: 4, symbol: 4 },
          null,
          { color: 4, symbol: 5 },
          { color: 1, symbol: 1 },
          null,
          { color: 2, symbol: 2 },
        ],
        [
          { color: 1, symbol: 1 },
          null,
          { color: 2, symbol: 2 },
          { color: 1, symbol: 1 },
          null,
          { color: 2, symbol: 2 },
        ],
        [
          null,
          { color: 1, symbol: 3 },
          { color: 3, symbol: 3 },
          { color: 4, symbol: 4 },
          null,
          { color: 4, symbol: 5 },
        ],
        [
          { color: 4, symbol: 4 },
          null,
          { color: 4, symbol: 5 },
          { color: 1, symbol: 1 },
          null,
          { color: 2, symbol: 2 },
        ],
      ],
      river: [
        { color: 1, symbol: 2 },
        { color: 6, symbol: 4 },
        { color: 5, symbol: 1 },
        { color: 4, symbol: 2 },
        { color: 4, symbol: 1 },
        { color: 5, symbol: 4 },
      ],
      moveDone: false,
      playerTurn: "Color",
    };

    const playerOne = { name: "Norbert", role: "Color" };
    const playerTwo = { name: "Nanny", role: "Symbol" };
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
}

export const isPlayerTurn = (
  role: string,
  gameStatePlayerTurn: string,
): boolean => {
  return role === gameStatePlayerTurn;
};
