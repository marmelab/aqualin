import { Cell, isHighlightToken, PlayerColor, Token } from "@aqua/core";
import { tokenBlocked } from "@aqua/core/utils";
import { checkHintCleaverMove, hintCurrentPlayer } from "src/engine/hints";

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
  const player = game.playerTeam === PlayerColor ? "color" : "symbol";
  const tokenHighlight = isHighlightToken(token);
  let cssClasses = tokenHighlight ? "dot" : Colors[token.color];

  if (tokenHighlight && hintCurrentPlayer(game) === "opponentClusters") {
    if (!checkHintCleaverMove(game, { row, column })) {
      cssClasses += " notCleaverMove";
    }
  }

  const rendedToken = tokenHighlight ? "" : renderImg(token);
  const coordFromBoard = game.gameState.selectedCoordinatesFromBoard;

  if (game.sealedTokens && game.sealedTokens[row][column]) {
    cssClasses += " sealedClusterToken";
  }

  if (game.movableTokens && game.movableTokens[row][column]) {
    cssClasses += " movableClusterToken";
  }
  if (
    game.noRemainingTokenTypes &&
    game.noRemainingTokenTypes.indexOf(
      game.gameState.board[row][column][player],
    ) !== -1
  ) {
    cssClasses = "noRemainingTokenType";
  }

  if (!game.isPlayerTurn || game.gameState.moveDone) {
    return `<div class="cell ${cssClasses}">${rendedToken}</div>`;
  } else if (
    coordFromBoard &&
    coordFromBoard.row === row &&
    coordFromBoard.column === column
  ) {
    return `<div class="cell selected ${cssClasses}">${rendedToken}</div>`;
  }

  if (!tokenHighlight && tokenBlocked(game.gameState, { row, column })) {
    return `<div class="cell ${cssClasses}">${rendedToken}</div>`;
  }
  cssClasses = checkAndAddMoveBetterPosition(game, cssClasses, row, column);
  return `<a href="/game/${game.id}/board/${row}/${column}" class="cell selectable ${cssClasses}">${rendedToken}</a>`;
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

const checkAndAddMoveBetterPosition = (
  game: GameTemplate,
  cssClasses: string,
  row: number,
  column: number,
) => {
  if (!game.movesBetterPosition) {
    return cssClasses;
  }
  if (game.movesBetterPosition[row][column]) {
    cssClasses += " moveBetterPosition";
    return cssClasses;
  }
  const selectedTokenCoordinates = game.gameState.selectedCoordinatesFromBoard;

  if (!selectedTokenCoordinates) {
    return cssClasses;
  }
  const moves =
    game.movesBetterPosition[selectedTokenCoordinates.row][
      selectedTokenCoordinates.column
    ];
  if (
    moves &&
    moves.some((coord) => coord.row === row && coord.column === column)
  ) {
    cssClasses += " moveBetterPosition";
  }
  return cssClasses;
};
