import { Cell, GameState, Token } from "@aqua/core";

import { DataColors } from "./Colors";
import { Symbols } from "./Symbols";

export function renderBoardCell(
  cell: Cell,
  gameState: GameState,
  row: number,
  column: number,
): string {
  if (cell) {
    return renderToken(cell, gameState, row, column);
  }
  return renderEmptyToken(gameState, row, column);
}

export function renderToken(
  token: Token,
  gameState: GameState,
  row: number,
  column: number,
): string {
  const color = DataColors[token.color];
  const symbol = Symbols[token.symbol];

  if (gameState.moveDone) {
    return `<div class="cell" style="color:${color};">${symbol}</div>`;
  } else if (
    gameState.selectedCoordinatesFromBoard &&
    gameState.selectedCoordinatesFromBoard.row === row &&
    gameState.selectedCoordinatesFromBoard.column === column
  ) {
    return `<div class="cell selected" style="color:${color};">${symbol}</div>`;
  }
  return `<a href="/board/${row}/${column}" class="cell selectable" style="color:${color};">${symbol}</a>`;
}

export function renderEmptyToken(
  gameState: GameState,
  row: number,
  column: number,
): string {
  if (gameState.selectedTokenFromRiver != null) {
    return `<a href="/board/${row}/${column}" class="emptyCell selectable"></a>`;
  }
  return `<div class="emptyCell"></div>`;
}
