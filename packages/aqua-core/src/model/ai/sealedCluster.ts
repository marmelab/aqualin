import Graph from "graphology";
import { forEachConnectedComponent } from "graphology-components";

import { GameState, SealedTokens, Token } from "../../types";
import { isOutOfBoard, isSamePosition, tokenBlocked } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { isHighlightToken } from "../highlightCoordinates";

export const getSealedTokens = (
  gameState: GameState,
  player: keyof Token,
  graph?: Graph,
) => {
  if (!graph) {
    graph = addEdges(gameState, constructBaseGraph(gameState), player);
  }
  const sealedClusters = getSealedCluster(gameState, graph, player);
  const sealedTokens = initEmptySealedTokens(gameState.board.length);
  for (const cluster of sealedClusters) {
    for (const token of cluster) {
      const coord = token.split(":");
      const coordRow = parseInt(coord[0], 10);
      const coordColumn = parseInt(coord[1], 10);
      sealedTokens[coordRow][coordColumn] = true;
    }
  }
  return sealedTokens;
};

export const getSealedCluster = (
  gameState: GameState,
  graph: Graph,
  player: keyof Token,
) => {
  const sealedClusters = [];
  forEachConnectedComponent(graph, (component) => {
    if (component.length > 1) {
      if (verifyComponentSeal(gameState, component, player)) {
        sealedClusters.push(component);
      }
    }
  });
  return sealedClusters;
};

const verifyComponentSeal = (
  game: GameState,
  component: string[],
  player: keyof Token,
): boolean => {
  for (const node of component) {
    if (!verifyTokenSeal(game, node, player)) {
      return false;
    }
  }
  return true;
};

const verifyTokenSeal = (
  game: GameState,
  node: string,
  player: keyof Token,
): boolean => {
  const coord = node.split(":");
  const row = parseInt(coord[0], 10);
  const column = parseInt(coord[1], 10);

  if (tokenBlocked(game, { row, column })) {
    return true;
  }
  return checkMoveDontBreakCluster(
    game,
    game.board[row][column],
    row,
    column,
    player,
  );
};

const checkMoveDontBreakCluster = (
  game: GameState,
  token: Token,
  row: number,
  column: number,
  player: keyof Token,
): boolean => {
  return (
    checkMoveInRowDirection(game, token, column, row, -1, player) &&
    checkMoveInRowDirection(game, token, column, row, +1, player) &&
    checkMoveInColumnDirection(game, token, row, column, -1, player) &&
    checkMoveInColumnDirection(game, token, row, column, +1, player)
  );
};

const checkMoveInRowDirection = (
  game: GameState,
  token: Token,
  column: number,
  start: number,
  direction: number,
  player: keyof Token,
): boolean => {
  for (
    let row = start + direction;
    direction > 0 ? row < game.board.length : row >= 0;
    row += direction
  ) {
    if (
      game.board[row][column] != null &&
      !isHighlightToken(game.board[row][column])
    ) {
      return true;
    }
    if (!checkNeighborsCells(game, token, row, column, start, column, player)) {
      return false;
    }
  }
  return true;
};

const checkMoveInColumnDirection = (
  game: GameState,
  token: Token,
  row: number,
  start: number,
  direction: number,
  player: keyof Token,
): boolean => {
  for (
    let column = start + direction;
    direction > 0 ? column < game.board.length : column >= 0;
    column += direction
  ) {
    if (
      game.board[row][column] != null &&
      !isHighlightToken(game.board[row][column])
    ) {
      return true;
    }
    if (!checkNeighborsCells(game, token, row, column, row, start, player)) {
      return false;
    }
  }
  return true;
};

const checkNeighborsCells = (
  game: GameState,
  token: Token,
  row: number,
  column: number,
  originalPosRow: number,
  originalPosCol: number,
  player: keyof Token,
): boolean => {
  return (
    checkCell(
      game,
      token,
      row - 1,
      column,
      originalPosRow,
      originalPosCol,
      player,
    ) ||
    checkCell(
      game,
      token,
      row + 1,
      column,
      originalPosRow,
      originalPosCol,
      player,
    ) ||
    checkCell(
      game,
      token,
      row,
      column - 1,
      originalPosRow,
      originalPosCol,
      player,
    ) ||
    checkCell(
      game,
      token,
      row,
      column + 1,
      originalPosRow,
      originalPosCol,
      player,
    )
  );
};

const checkCell = (
  game: GameState,
  token: Token,
  row: number,
  column: number,
  originalPosRow: number,
  originalPosCol: number,
  player: keyof Token,
): boolean => {
  if (
    isSamePosition(
      { row, column },
      { row: originalPosRow, column: originalPosCol },
    ) ||
    isOutOfBoard(game, row, column)
  ) {
    return false;
  }
  return (
    game.board[row][column] != null &&
    game.board[row][column][player] === token[player]
  );
};

const initEmptySealedTokens = (size: number): SealedTokens => {
  const sealedTokens: SealedTokens = [];
  for (let row = 0; row < size; row++) {
    sealedTokens[row] = new Array(size).fill(false);
  }
  return sealedTokens;
};
