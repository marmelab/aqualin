import { Cell, highlightToken, Token } from "@aqua/core";
import { tokenBlocked } from "@aqua/core/utils";

import { GameTemplate } from "../types";
import { Colors } from "./Colors";
import { renderImg } from "./renderImg";

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
  const filter =
    highlightToken.symbol === token.symbol ? "dot" : Colors[token.color];
  if (!game.isPlayerTurn || game.gameState.moveDone) {
    return `<div class="cell ${filter} " >${renderImg(token)}</div>`;
  } else if (
    game.gameState.selectedCoordinatesFromBoard &&
    game.gameState.selectedCoordinatesFromBoard.row === row &&
    game.gameState.selectedCoordinatesFromBoard.column === column
  ) {
    return `<div class="cell ${filter} selected" >${renderImg(token)}</div>`;
  }

  const rendedToken =
    highlightToken.symbol === token.symbol ? "" : renderImg(token);

  if (tokenBlocked(game.gameState, { row, column })) {
    return `<div class="cell ${filter}" >${renderImg(token)}</div>`;
  }
  return `<a href="/game/${game.id}/board/${row}/${column}" class="cell ${filter} selectable" >${rendedToken}</a>`;
}

export function renderEmptyToken(
  game: GameTemplate,
  row: number,
  column: number,
): string {
  if (game.gameState.selectedTokenFromRiver != null && game.isPlayerTurn) {
    return `<a href="/game/${game.id}/board/${row}/${column}" class="emptyCell selectable"></a>`;
  }
  return `<div class="emptyCell"></div>`;
}
