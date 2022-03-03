import { Coordinates } from "../types";
import { GameState, Board, Token } from "./GameStateTypes";

export function cleanCell(coordinates: Coordinates, gameState: GameState) {
  gameState.board[coordinates.row][coordinates.column] = null;
}
export function allocateCell(
  coordinates: Coordinates,
  board: Board,
  token: Token
) {
  board[coordinates.row][coordinates.column] = token;
}
