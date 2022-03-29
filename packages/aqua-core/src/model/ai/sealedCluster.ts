import Graph from "graphology";
import { forEachConnectedComponent } from "graphology-components";

import { GameState, SealedTokens, Token } from "../../types";
import { isOutOfBoard, isSamePosition, tokenBlocked } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { isHighlightToken } from "../highlightCoordinates";

export const getSealedAndMovableTokens = (
  gameState: GameState,
  player: keyof Token,
  graph?: Graph,
) => {
  if (!graph) {
    graph = addEdges(gameState, constructBaseGraph(gameState), player);
  }
  const sealedAndMovableTokens = {
    sealedTokens: initEmptyTokensWithFalse(gameState.board.length),
    movableTokens: initEmptyTokensWithFalse(gameState.board.length),
  };
  const clusters = getSealedAndUnsealedCluster(gameState, graph, player);

  for (const cluster of clusters.sealedClusters) {
    for (const token of cluster) {
      const coord = token.split(":");
      const coordRow = parseInt(coord[0], 10);
      const coordColumn = parseInt(coord[1], 10);
      sealedAndMovableTokens.sealedTokens[coordRow][coordColumn] = true;
    }
  }

  for (const cluster of clusters.unsealedClusters) {
    for (const token of cluster) {
      const coord = token.split(":");
      const coordRow = parseInt(coord[0], 10);
      const coordColumn = parseInt(coord[1], 10);

      //TODO with PR 65, change !tokenBlocked by checkMoveDontBreakCluster
      sealedAndMovableTokens.movableTokens[coordRow][coordColumn] =
        !checkMoveDontBreakCluster(
          gameState,
          gameState.board[coordRow][coordColumn],
          coordRow,
          coordColumn,
          player,
        );
    }
  }

  return sealedAndMovableTokens;
};

export const getSealedAndUnsealedCluster = (
  gameState: GameState,
  graph: Graph,
  player: keyof Token,
) => {
  const clusters: {
    sealedClusters: string[][];
    unsealedClusters: string[][];
  } = { sealedClusters: [], unsealedClusters: [] };

  forEachConnectedComponent(graph, (component) => {
    if (component.length > 1) {
      if (verifyComponentSeal(gameState, component, player)) {
        clusters.sealedClusters.push(component);
      } else {
        clusters.unsealedClusters.push(component);
      }
    }
  });

  return clusters;
};

const verifyComponentSeal = (
  gameState: GameState,
  component: string[],
  player: keyof Token,
): boolean => {
  for (const node of component) {
    if (!verifyTokenSeal(gameState, node, player)) {
      return false;
    }
  }
  return true;
};

const verifyTokenSeal = (
  gameState: GameState,
  node: string,
  player: keyof Token,
): boolean => {
  const coord = node.split(":");
  const row = parseInt(coord[0], 10);
  const column = parseInt(coord[1], 10);

  if (tokenBlocked(gameState, { row, column })) {
    return true;
  }
  return checkMoveDontBreakCluster(
    gameState,
    gameState.board[row][column],
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

export const checkNeighborsCells = (
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

const initEmptyTokensWithFalse = (size: number): SealedTokens => {
  const sealedTokens: SealedTokens = [];
  for (let row = 0; row < size; row++) {
    sealedTokens[row] = new Array(size).fill(false);
  }
  return sealedTokens;
};
