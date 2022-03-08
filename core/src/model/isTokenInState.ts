import { Cell, GameState, Token } from "@aqua/core";

export const isTokenInState = (token: Token, gameState: GameState) => {
  const cellContainsToken = (cell: Cell) =>
    cell != null && cell.symbol == token.symbol && cell.color == token.color;

  const tokenIsInBoard = gameState.board.some((row) =>
    row.some(cellContainsToken),
  );
  if (tokenIsInBoard) {
    return true;
  }
  const tokenIsInRiver = gameState.river.some(cellContainsToken);
  if (tokenIsInRiver) {
    return true;
  }
  return false;
};
