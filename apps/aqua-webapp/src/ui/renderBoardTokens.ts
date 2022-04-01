import {
  Cell,
  checkHintCleaverMove,
  isHighlightToken,
  isSamePosition,
  Token,
  tokenBlocked,
} from "@aqua/core";
import { getOpponent, getPlayer, hintCurrentPlayer } from "src/engine/hints";

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
  const tokenHighlight = isHighlightToken(token);

  let cssClasses = getCssClasses(game, row, column, token, tokenHighlight);

  const rendedToken = tokenHighlight ? "" : renderImg(token);
  const coordFromBoard = game.gameState.selectedCoordinatesFromBoard;

  if (!game.isPlayerTurn || game.gameState.moveDone) {
    cssClasses +=
      coordFromBoard && isSamePosition(coordFromBoard, { row, column })
        ? " selected"
        : "";
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
  let cssClasses: string = "emptyCell";
  if (game.bestTurn && game.isPlayerTurn) {
    const place = game.bestTurn.minMaxGameStateTurn.place;
    if (
      game.gameState.selectedTokenFromRiver != null &&
      game.gameState.selectedTokenFromRiver === place.indexRiverToken &&
      isSamePosition(place.coordinates, { row, column })
    ) {
      //show target for token to place
      cssClasses += " dot moveBetterPosition";
    }
  } else {
    cssClasses = checkAndAddPlacementsFromRiver(game, cssClasses, row, column);
  }

  if (game.gameState.selectedTokenFromRiver != null && game.isPlayerTurn) {
    return `<a href="/game/${game.id}/board/${row}/${column}" class="${cssClasses} selectable"></a>`;
  }
  return `<div class="${cssClasses}"></div>`;
}

const checkAndAddMoveBetterPosition = (
  game: GameTemplate,
  initialCssClasses: string,
  row: number,
  column: number,
) => {
  if (!game.movesBetterPosition) {
    return initialCssClasses;
  }
  if (game.movesBetterPosition[row][column]) {
    initialCssClasses += " moveBetterPosition";
    return initialCssClasses;
  }
  const selectedTokenCoordinates = game.gameState.selectedCoordinatesFromBoard;

  if (!selectedTokenCoordinates) {
    return initialCssClasses;
  }
  const moves =
    game.movesBetterPosition[selectedTokenCoordinates.row][
      selectedTokenCoordinates.column
    ];
  if (
    moves &&
    moves.some((coord) => coord.row === row && coord.column === column)
  ) {
    initialCssClasses += " moveBetterPosition";
  }
  return initialCssClasses;
};

const checkAndAddPlacementsFromRiver = (
  game: GameTemplate,
  initialCssClasses: string,
  row: number,
  column: number,
) => {
  if (
    game.gameState.selectedTokenFromRiver != null &&
    game.placementsFromRiver &&
    game.placementsFromRiver[game.gameState.selectedTokenFromRiver] &&
    game.placementsFromRiver[game.gameState.selectedTokenFromRiver].some(
      (coordinate) => isSamePosition(coordinate, { row, column }),
    )
  ) {
    initialCssClasses += " moveBetterPosition";
  }
  return initialCssClasses;
};
const getCssClasses = (
  game: GameTemplate,
  row: number,
  column: number,
  token: Token,
  tokenHighlight: boolean,
): string => {
  let cssClasses: string = "";
  cssClasses = tokenHighlight ? "dot" : Colors[token.color];
  if (game.bestTurn && game.isPlayerTurn) {
    const move = game.bestTurn.minMaxGameStateTurn.move;

    if (
      move &&
      (isSamePosition(move.source, { row, column }) ||
        isSamePosition(move.target, { row, column }))
    ) {
      //TODO It will not work for target
      cssClasses += " moveBetterPosition";
    }
  }
  if (tokenHighlight && hintCurrentPlayer(game) === "opponentClusters") {
    if (
      !checkHintCleaverMove(game.gameState, { row, column }, getOpponent(game))
    ) {
      cssClasses += " notCleaverMove";
    }
  }

  if (game.sealedTokens && game.sealedTokens[row][column]) {
    cssClasses += " sealedClusterToken";
  }

  if (game.movableTokens && game.movableTokens[row][column]) {
    cssClasses += " movableClusterToken";
  }
  if (
    game.noRemainingTokenTypes &&
    game.noRemainingTokenTypes.indexOf(
      game.gameState.board[row][column][getPlayer(game)],
    ) !== -1
  ) {
    cssClasses += " noRemainingTokenType";
  }

  return cssClasses;
};
