import { allocateCell } from "./cellActions";
import { Board, GameState, River } from "./GameStateTypes";
import { TokenToPlace } from "./types";
import { Coordinates } from "./types";

export function placeToken(
  tokenToPlace: TokenToPlace,
  gameState: GameState
): GameState {
  const { riverToken, coordinates } = tokenToPlace;

  let river = gameState.river;
  if (isRiverSlotEmpty(riverToken, river)) {
    throw new Error("The river token Coordinates is empty");
  }
  if (isTargetOccupied(coordinates, gameState.board)) {
    throw new Error("The river token target coordinates are occupied");
  }
  allocateCell(coordinates, gameState.board, river[riverToken]);

  return gameState;
}

function isRiverSlotEmpty(riverToken: number, river: River): boolean {
  if (river[riverToken]) {
    return false;
  }
  return true;
}

function isTargetOccupied(Coordinates: Coordinates, board: Board): boolean {
  if (board[Coordinates.row][Coordinates.column] !== null) {
    return true;
  }
  return false;
}
