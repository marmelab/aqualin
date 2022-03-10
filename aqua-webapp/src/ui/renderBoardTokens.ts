import { Cell, GameState, Token } from "@aqua/core";
import { GameTemplate } from "src/types";

import { DataColors } from "./Colors";
import { Symbols } from "./Symbols";

export function renderBoardCell(
  cell: Cell,
  game: GameTemplate,
  row: number,
  column: number,
): string {
  if (cell) {
    return renderToken(cell, game, row, column);
  }
  return renderEmptyToken(game, row, column);
}

export function renderToken(
  token: Token,
  game: GameTemplate,
  row: number,
  column: number,
): string {
  const color = DataColors[token.color];
  const symbol = Symbols[token.symbol];

  if (game.gameState.moveDone) {
    return `<div class="cell" style="color:${color};">${symbol}</div>`;
  } else if (
    game.gameState.selectedCoordinatesFromBoard &&
    game.gameState.selectedCoordinatesFromBoard.row === row &&
    game.gameState.selectedCoordinatesFromBoard.column === column
  ) {
    return `<div class="cell selected" style="color:${color};">${symbol}</div>`;
  }
  return `<a href="/game/${game.id}/board/${row}/${column}" class="cell selectable" style="color:${color};">${symbol}</a>`;
}

export function renderEmptyToken(
  game: GameTemplate,
  row: number,
  column: number,
): string {
  if (game.gameState.selectedTokenFromRiver != null) {
    return `<a href="/game/${game.id}/board/${row}/${column}" class="emptyCell selectable"></a>`;
  }
  return `<div class="emptyCell"></div>`;
}
