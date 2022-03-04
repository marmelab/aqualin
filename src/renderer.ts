import blessed from "blessed";

import { isCellSelected } from "./cellActions";
import { renderCell, renderEmptyToken, renderToken } from "./drawGameState";
import { GameState, Token } from "./GameStateTypes";
import { StockManager } from "./stock";
import { columnLabel } from "./utils";

let screen;
if (process.env.JEST_WORKER_ID === undefined) {
  screen = blessed.screen({
    smartCSR: true,
  });
} else {
  screen = {};
}w
const CELL_WIDTH = 6;
const CELL_HEIGHT = 3;
const PADDING_WIDTH = 8;
const PADDING_HEIGHT = 4;
const OTHER_HEIGHT = 2;
// Create a screen object.
export const initScreen = (): blessed.Widgets.Screen => {
  screen.title = "Aqualin";
  screen.key(["escape", "q", "C-c"], function (ch, key) {
    return process.exit(0);
  });
  return screen;
};

export const renderBoard = (
  gameState: GameState,
  screen: blessed.Widgets.Screen,
  stockManager: StockManager
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const boardLayout = createBoardOuterLayout(gameState);

    // For each column
    gameState.board.forEach((element, rowIndex) => {
      gameState.board[rowIndex].forEach((element, columnIndex) => {
        if (rowIndex === 0) {
          drawColumnLabel(boardLayout, columnIndex);
        }
        if (columnIndex === 0) {
          drawRawLabel(boardLayout, rowIndex);
        }
        drawCellBox(boardLayout, columnIndex, rowIndex, gameState, resolve);

        // createBoardTopEdge(boardLayout, x);
        //createBoardBottomEdge(boardLayout, gameState, x);
      });
    });
    displayRiver(boardLayout, gameState, resolve);
    displayStock(boardLayout, gameState, stockManager);

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
      OTHER_HEIGHT * (gameState.board.length + 1) +
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

const getColumnLabelToDisplay = (index: number): string => {
  return columnLabel(index);
};

const drawColumnLabel = (
  boardLayout: blessed.Widgets.BoxElement,
  index: number
) => {
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "middle",
    content: getColumnLabelToDisplay(index),

    top: 0,
    left: PADDING_WIDTH - 2 + index * CELL_WIDTH,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
};

const drawRawLabel = (
  boardLayout: blessed.Widgets.BoxElement,
  index: number
) => {
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "middle",
    content: `${index + 1}`,

    top: PADDING_HEIGHT - 2 + index * CELL_HEIGHT,
    left: 0,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
};

const drawCellBox = (
  boardLayout: blessed.Widgets.BoxElement,
  columnIndex: number,
  rowIndex: number,
  gameState: GameState,

  resolve: (data: any) => void
) => {
  let bg = "";

  if (
    isCellSelected(
      { row: rowIndex, column: columnIndex },
      gameState.selectedCoordinatesFromBoard
    )
  ) {
    bg = "grey";
  }
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "middle",
    content: renderCell(gameState.board[rowIndex][columnIndex]),

    top: PADDING_HEIGHT - 2 + rowIndex * CELL_HEIGHT,
    left: PADDING_WIDTH - 2 + columnIndex * CELL_WIDTH,
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
    },
  });
  box.on("click", (data) => {
    const coordinates = {
      row: rowIndex,
      column: columnIndex,
    };
    resolve(coordinates);
  });
};

const displayRiver = (
  boardLayout: blessed.Widgets.BoxElement,
  gameState: GameState,
  resolve: (data: any) => void
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
  resolve: (data: any) => void
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
      PADDING_HEIGHT - 2 + gameState.board.length * CELL_HEIGHT + OTHER_HEIGHT,
    left: PADDING_WIDTH - 2 + index * CELL_WIDTH,
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
  index: number
) {
  const box = blessed.box({
    parent: boardLayout,
    align: "center",
    valign: "bottom",
    content: `${index + 1}`,

    top: PADDING_HEIGHT - 2 + gameState.board.length * CELL_HEIGHT,
    left: PADDING_WIDTH - 2 + index * CELL_WIDTH,
    width: CELL_WIDTH,
    height: OTHER_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
}

const displayStock = (
  bordLayout: blessed.Widgets.BoxElement,
  gameState: GameState,
  stockManager: StockManager
) => {
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      let token = { color: row, symbol: column };
      drawStockToken(bordLayout, stockManager, gameState, token);
    }
  }
};

function drawStockToken(
  boardLayout: blessed.Widgets.BoxElement,
  stockManager: StockManager,
  gameState: GameState,
  token: Token
) {
  let tokenToString: string;
  if (stockManager.isInStock(token)) {
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
      OTHER_HEIGHT * (token.color + 1), // token.symbol because it's the raw index, +1 for the height of the river labels
    left: PADDING_WIDTH - 2 + token.symbol * CELL_WIDTH, // token.symbol because it's the column index
    width: CELL_WIDTH,
    height: OTHER_HEIGHT,
    tags: true,
    style: { bg: "black" },
  });
}
/* const box = blessed.box({
      parent: boardLayout,
      align: "center",
      valign: "middle",
      content: renderCell(board[rowIndex][columnIndex]),
  
      top: PADDING_HEIGHT - 2 + rowIndex * CELL_HEIGHT,
      left: PADDING_WIDTH - 2 + columnIndex * CELL_WIDTH,
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
      tags: true,
      border: {
        type: "line",
      },
    });
    box.on("click", function (data) {
      box.setContent("x");
      screen.render();
    });*/

/*

  // Append our box to the screen.
  screen.append(box);

  // If our box is clicked, change the content.
 

  // If box is focused, handle `enter`/`return` and give us some more content.
  box.key("enter", function (ch, key) {
    box.setContent(
      "{right}Even different {black-fg}content{/black-fg}.{/right}\n"
    );
    box.setLine(1, "bar");
    box.insertLine(1, "foo");
    screen.render();
  });

  // Quit on Escape, q, or Control-C.
  screen.key(["escape", "q", "C-c"], function (ch, key) {
    return process.exit(0);
  });

  // Focus our element.
  box.focus();

  // Render the screen.
  screen.render();
  return screen;
};*/
