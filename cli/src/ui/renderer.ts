import blessed, { Widgets } from "blessed";

import { isCellSelected } from "../@aqua/core/model/cellActions";
import { computeStock } from "../@aqua/core/model/computeStock";
import { getPossibleMoves } from "../@aqua/core/model/highlightCoordinates";
import { isTokenInStock } from "../@aqua/core/model/isTokenInStock";
import { Player } from "../@aqua/core/types";
import { columnLabel } from "../@aqua/core/utils";
import { GameState, Token } from "../GameStateTypes";
import { renderCell, renderEmptyToken, renderToken } from "./drawGameState";

let screen: Widgets.Screen;
if (process.env.JEST_WORKER_ID === undefined) {
  screen = blessed.screen({
    smartCSR: true,
  });
}

const CELL_WIDTH = 5;
const CELL_HEIGHT = 3;
const PADDING_WIDTH = 12;
const LEFT_SPACE = 6;
const PADDING_HEIGHT = 4;
const OTHER_HEIGHT = 2;
const NUMBER_OF_OTHER_HEIGHT = 4; //4 : 1 for river label, 3 other for title
// Create a screen object.
export const initScreen = (): blessed.Widgets.Screen => {
  screen.title = "Aqualin";
  screen.key(["escape", "q", "C-c"], () => {
    return process.exit(0);
  });
  return screen;
};

export const renderBoard = (
  gameState: GameState,
  screen: blessed.Widgets.Screen,
  playerTurn?: Player,
  message?: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const boardLayout = createBoardOuterLayout(gameState);

    // For each column
    titlePartOfGame(boardLayout, "Board", gameState);
    titlePartOfGame(boardLayout, "River", gameState);
    titlePartOfGame(boardLayout, "Stock", gameState);
    gameState.board.forEach((element, row) => {
      gameState.board[row].forEach((element, column) => {
        if (row === 0) {
          drawColumnLabel(boardLayout, column);
        }
        if (column === 0) {
          drawRawLabel(boardLayout, row);
        }
        drawCellBox(boardLayout, column, row, gameState, resolve);
      });
    });
    displayRiver(boardLayout, gameState, resolve);
    displayStock(boardLayout, gameState);

    if (playerTurn) {
      screen.append(
        blessed.box({
          content: `Player turn : ${playerTurn}\n${message}`,
          align: "left",
        }),
      );
    }
    screen.append(boardLayout);

    screen.render();
  });
};

const createBoardOuterLayout = (gameState: GameState) => {
  return blessed.box({
    top: "center",
    left: "center",
    width: CELL_WIDTH * gameState.board.length + PADDING_WIDTH,
    height:
      CELL_HEIGHT * (gameState.board.length + 1) +
      OTHER_HEIGHT * (gameState.board.length + NUMBER_OF_OTHER_HEIGHT) +
      PADDING_HEIGHT,
    tags: true,
    border: {
      type: "line",
    },
    style: {
      border: {
        fg: "white",
      },
      bg: "black",
    },
  });
};
const titlePartOfGame = (
  boardLayout: blessed.Widgets.BoxElement,
  title: string,
  gameState: GameState,
) => {
  const height = calculateHeightPosition(title, gameState);

  const box = blessed.box({
    parent: boardLayout,
    align: "left",
    valign: "middle",
    content: title,

    top: height,
    left: 2,
    width: "50%",
    height: OTHER_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
};

const getColumnLabelToDisplay = (index: number): string => {
  return columnLabel(index);
};

const drawColumnLabel = (
  boardLayout: blessed.Widgets.BoxElement,
  index: number,
) => {
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "middle",
    content: getColumnLabelToDisplay(index),

    top: OTHER_HEIGHT,
    left: PADDING_WIDTH - LEFT_SPACE + index * CELL_WIDTH,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
};

const drawRawLabel = (
  boardLayout: blessed.Widgets.BoxElement,
  index: number,
) => {
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "middle",
    content: `${index + 1}`,

    top: PADDING_HEIGHT - 2 + index * CELL_HEIGHT + OTHER_HEIGHT,
    left: 0,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
};

const drawCellBox = (
  boardLayout: blessed.Widgets.BoxElement,
  column: number,
  row: number,
  gameState: GameState,
  resolve: (data: any) => void,
) => {
  let bg = "";
  let hover = "";
  //TODO inactive hover if moveIsAlreadyDone
  if (!gameState.moveDone && gameState.board[row][column] !== null) {
    const possibleCells = getPossibleMoves(gameState.board, { row, column });

    if (possibleCells !== []) {
      hover = "grey";
    }
  }

  if (isCellSelected({ row, column }, gameState.selectedCoordinatesFromBoard)) {
    bg = "grey";
  }
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "middle",
    content: renderCell(gameState.board[row][column]),

    top: PADDING_HEIGHT - 2 + row * CELL_HEIGHT + OTHER_HEIGHT,
    left: PADDING_WIDTH - LEFT_SPACE + column * CELL_WIDTH,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    tags: true,
    border: {
      type: "line",
    },
    style: {
      border: {
        fg: "white",
      },
      bg: bg,
      hover: {
        bg: hover,
      },
    },
  });
  box.on("click", (data) => {
    const coordinates = {
      row,
      column,
    };
    resolve(coordinates);
  });
};

const displayRiver = (
  boardLayout: blessed.Widgets.BoxElement,
  gameState: GameState,
  resolve: (data: any) => void,
) => {
  gameState.river.forEach((token, index) => {
    drawRiverLabels(boardLayout, gameState, index);
    drawRiverToken(boardLayout, token, index, gameState, resolve);
  });
};

const drawRiverToken = (
  boardLayout: blessed.Widgets.BoxElement,
  token: Token,
  index: number,
  gameState: GameState,
  resolve: (data: any) => void,
) => {
  let bg = "";

  if (index === gameState.selectedTokenFromRiver) {
    bg = "grey";
  }
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "middle",
    content: renderCell(token),

    top:
      PADDING_HEIGHT -
      2 +
      gameState.board.length * CELL_HEIGHT +
      OTHER_HEIGHT * 3,
    left: PADDING_WIDTH - LEFT_SPACE + index * CELL_WIDTH,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    tags: true,
    border: {
      type: "line",
    },
    style: {
      border: {
        fg: "white",
      },
      bg: bg,
      hover: {
        bg: "grey",
      },
    },
  });
  box.on("click", function (data) {
    const coordinates = {
      row: null,
      column: index,
    };
    resolve(coordinates);
  });
};

function drawRiverLabels(
  boardLayout: blessed.Widgets.BoxElement,
  gameState: GameState,
  index: number,
) {
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "bottom",
    content: `${index + 1}`,

    top:
      PADDING_HEIGHT -
      2 +
      gameState.board.length * CELL_HEIGHT +
      OTHER_HEIGHT * 2,
    left: PADDING_WIDTH - LEFT_SPACE + index * CELL_WIDTH,
    width: CELL_WIDTH,
    height: OTHER_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
}

const displayStock = (
  bordLayout: blessed.Widgets.BoxElement,
  gameState: GameState,
) => {
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      const token = { color: row, symbol: column };
      drawStockToken(bordLayout, gameState, token);
    }
  }
};

function drawStockToken(
  boardLayout: blessed.Widgets.BoxElement,
  gameState: GameState,
  token: Token,
) {
  let tokenToString: string;
  if (isTokenInStock(token, computeStock(gameState))) {
    tokenToString = renderToken(token);
  } else {
    tokenToString = renderEmptyToken();
  }
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "middle",
    content: `${tokenToString}`,

    top:
      PADDING_HEIGHT -
      2 +
      (gameState.board.length + 1) * CELL_HEIGHT + // +1 for the height of the token river
      OTHER_HEIGHT * (token.color + 1 + 3), // token.symbol because it's the raw index, +1 for the height of the river labels
    left: PADDING_WIDTH - LEFT_SPACE + token.symbol * CELL_WIDTH, // token.symbol because it's the column index
    width: CELL_WIDTH,
    height: OTHER_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
}

function calculateHeightPosition(title: string, gameState: GameState) {
  switch (title) {
    case "Board":
      return 0;
    case "River":
      return (
        PADDING_HEIGHT - 2 + gameState.board.length * CELL_HEIGHT + OTHER_HEIGHT
      );
    case "Stock":
      return (
        PADDING_HEIGHT -
        2 +
        (gameState.board.length + 1) * CELL_HEIGHT + // +1 for the height of the token river
        OTHER_HEIGHT * 3
      );
  }
}
