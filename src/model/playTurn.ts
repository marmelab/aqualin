import { GameState } from "../GameStateTypes";
import { Turn } from "../types";
import { deepClone } from "../utils";
import { fillRiver } from "./fillRiver";
import { moveToken } from "./moveToken";
import { placeToken } from "./placeToken";

export const playTurn = (gameState: GameState, turn: Turn) => {
  let onGoingGameState = deepClone(gameState);
  if (turn.move) {
    onGoingGameState = moveToken(turn.move, onGoingGameState);
  }
  onGoingGameState = placeToken(turn.tokenToPlace, onGoingGameState);
  onGoingGameState = fillRiver(onGoingGameState);
  return onGoingGameState;
};
