import { Board, GameState, River } from "./GameStateTypes";
import { TokenToPlace } from "./types";
import { Coordinates } from "./types";

export async function placeToken(
  tokenToPlace: TokenToPlace,
  gameState: GameState
): Promise<GameState> {
  const { riverToken, coordinates } = tokenToPlace;
  // Moves are invalid the river slot is empty
  let river = gameState.river;
  isRverSlotEmpty(riverToken, river);
  isTargetOccupied(coordinates, gameState.board);

  gameState.board[coordinates.row][coordinates.column] = river[riverToken];
  return gameState;
}

function isRverSlotEmpty(riverToken: number, river: River): boolean {
  if (!river[riverToken]) {
    throw new Error("The river token Coordinates is empty");
  }
  return false;
}

function isTargetOccupied(Coordinates: Coordinates, board: Board): boolean {
  if (board[Coordinates.row][Coordinates.column] !== null) {
    throw new Error("The river token target coordinates are occupied");
  }
  return false;
}
