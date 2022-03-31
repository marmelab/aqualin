import { Coordinates, GameState, Token } from "../../types";
import { isSamePosition, isOutOfBoard } from "../../utils";

export const checkNeighborsCells = (
  game: GameState,
  token: Token,
  coordinates: Coordinates,
  originalCoordinates: Coordinates,
  player: keyof Token,
): boolean => {
  return (
    checkCell(
      game,
      token,
      { row: coordinates.row - 1, column: coordinates.column },
      originalCoordinates,
      player,
    ) ||
    checkCell(
      game,
      token,
      { row: coordinates.row + 1, column: coordinates.column },
      originalCoordinates,
      player,
    ) ||
    checkCell(
      game,
      token,
      { row: coordinates.row, column: coordinates.column - 1 },
      originalCoordinates,
      player,
    ) ||
    checkCell(
      game,
      token,
      { row: coordinates.row, column: coordinates.column + 1 },
      originalCoordinates,
      player,
    )
  );
};

const checkCell = (
  game: GameState,
  token: Token,
  coordinates: Coordinates,
  originalCoordinates: Coordinates,
  player: keyof Token,
): boolean => {
  if (
    isSamePosition(coordinates, originalCoordinates) ||
    isOutOfBoard(game.board, coordinates.row, coordinates.column)
  ) {
    return false;
  }
  return (
    game.board[coordinates.row][coordinates.column] != null &&
    game.board[coordinates.row][coordinates.column][player] === token[player]
  );
};

export const nodeIdToCoordinates = (id: string) => {
  const coord = id.split(":");
  return { row: parseInt(coord[0], 10), column: parseInt(coord[1], 10) };
};
