import { Board, GameState, Token } from "./GameStateTypes";
import { Coordinates } from "./types";

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

export function isCellOccupied(coordinates: Coordinates, board: Board) {
  return board[coordinates.row][coordinates.column] !== null;
}
export function isCellSelected(
  cellCoordinates: Coordinates,
  selectedCoordinates: Coordinates
) {
  return (
    selectedCoordinates != null &&
    cellCoordinates.row === selectedCoordinates.row &&
    cellCoordinates.column === selectedCoordinates.column
  );
}

export const hasSelectedCoordinatesFromBoard = (gameState: GameState) => {
  return gameState.selectedCoordinatesFromBoard != null;
};

export function hasSelectedIndexRiverToken(gameState: GameState) {
  return gameState.selectedTokenFromRiver != null;
}
