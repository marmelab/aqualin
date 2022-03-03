import { allocateCell } from "../cellActions";
import { Board, GameState, River } from "../GameStateTypes";
import { TokenToPlace } from "../types";
import { Coordinates } from "../types";

export function placeToken(
  tokenToPlace: TokenToPlace,
  gameState: GameState
): GameState {
  const { riverToken, coordinates } = tokenToPlace;

  let river = gameState.river;
  if (isRiverSlotEmpty(riverToken, river)) {
    throw new Error("The river token slot is empty");
  }
  if (isTargetOccupied(coordinates, gameState.board)) {
    throw new Error("The river token target coordinates are occupied");
  }
  const token = river[riverToken];
  allocateCell(coordinates, gameState.board, river[riverToken]);
  gameState.river.splice(riverToken, 1);
  return gameState;
}

function isRiverSlotEmpty(riverToken: number, river: River): boolean {
  return !river[riverToken];
}

function isTargetOccupied(Coordinates: Coordinates, board: Board): boolean {
  return board[Coordinates.row][Coordinates.column] !== null;
}
