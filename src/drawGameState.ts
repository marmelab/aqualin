import { Colors, DataColors } from "./Colors";
import { Board, Cell, GameState, River, Token } from "./GameStateTypes";
import { isInStock, stock, Stock, visualStock } from "./stock";
import { Symbols } from "./Symbols";
const axisLabels = "     A   B   C  ";
const topLine = "   ┌───┬───┬───┐";
const rowLine = "   ├───┼───┼───┤";
const baseLine = "   └───┴───┴───┘";

export function drawGameState(gameState: GameState) {
  console.clear();
  drawBoard(gameState.board);
  let { riverNumberRow, riverTokenRow } = renderRiver(gameState.river);
  console.log(riverNumberRow);
  console.log(riverTokenRow);
  console.log(renderStock(stock, gameState));
}

export function drawBoard(board: Board) {
  console.log(axisLabels);
  console.log(topLine);
  for (let i = 0; i < board.length; i++) {
    let rowCharacters = " " + (i + 1) + " │";
    for (let j = 0; j < board[i].length; j++) {
      let cell = board[i][j];
      rowCharacters += renderCell(cell) + "│";
    }
    console.log(rowCharacters);
    if (i !== board.length - 1) {
      console.log(rowLine);
    }
  }
  console.log(baseLine);
}

export function renderRiver(river: River) {
  let i = 1;
  let riverNumberRow = "RIVER ";
  let riverTokenRow = "      ";
  for (let token of river) {
    riverNumberRow += " " + i + " ";
    riverTokenRow += renderToken(token);
    i++;
  }
  return { riverNumberRow: riverNumberRow, riverTokenRow: riverTokenRow };
}

function renderCell(cell: Cell): string {
  if (cell) {
    return renderToken(cell);
  }
  return renderEmptyToken();
}

function renderToken(token: Token): string {
  return (
    " " + DataColors[token.color] + Symbols[token.symbol] + Colors.reset + " "
  );
}

function renderEmptyToken(): string {
  return "   ";
}

function renderStock(stock: Stock, gameState: GameState): string {
  let lines = "STOCK\n";
  for (let row = 1; row <= gameState.board.length; row++) {
    for (let column = 1; column <= gameState.board.length; column++) {
      let token = { color: row, symbol: column };
      if (isInStock(token)) {
        lines += renderToken(token);
      } else {
        lines += renderEmptyToken();
      }
    }
    lines += "\n";
  }
  return lines;
}
