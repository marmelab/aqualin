import { InvalidTarget } from "../errors/invalidTarget";
import { RiverTokenNotSelected } from "../errors/riverTokenNotSelected";
import { Board, GameState, River } from "../types";
import { Coordinates, TokenToPlace } from "../types";
import { allocateCell, isCellOccupied } from "./cellActions";

export function placeToken(
  tokenToPlace: TokenToPlace,
  gameState: GameState,
): GameState {
  const { indexRiverToken: riverToken, coordinates } = tokenToPlace;

  const river = gameState.river;
  if (isRiverSlotEmpty(riverToken, river)) {
    throw new RiverTokenNotSelected();
  }
  if (isTargetOccupied(coordinates, gameState.board)) {
    throw new InvalidTarget();
  }
  allocateCell(coordinates, gameState.board, river[riverToken]);
  gameState.river.splice(riverToken, 1);
  return gameState;
}

function isRiverSlotEmpty(riverToken: number, river: River): boolean {
  return !river[riverToken];
}

function isTargetOccupied(coordinates: Coordinates, board: Board): boolean {
  return isCellOccupied(coordinates, board);
}
