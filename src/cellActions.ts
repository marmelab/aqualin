import { GameState, Token } from "./GameStateTypes";
import { Coordinates } from "./types";

export function cleanCell(coordinates: Coordinates, gameState: GameState) {
  gameState.board[coordinates.row][coordinates.column] = null;
}
export function allocateCell(
  coordinates: Coordinates,
  gameState: GameState,
  token: Token
) {
  gameState.board[coordinates.row][coordinates.column] = token;
}
