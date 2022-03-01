import { GameState, Token } from "./GameStateTypes";

export type Stock = Token[];
export let stock: Stock = [];
export const visualStock: Array<Array<boolean>> = [];

export function initStock(gameState: GameState): void {
  for (let row = 1; row <= gameState.board.length; row++) {
    if (!visualStock[row]) {
      visualStock[row] = [];
    }
    for (let column = 1; column <= gameState.board.length; column++) {
      let token = { color: row, symbol: column };
      if (!isPresentIngame(token, gameState)) {
        stock.push(token);
        visualStock[row][column] = true;
      } else {
        visualStock[row][column] = false;
      }
    }
  }
}

export function isPresentIngame(token: Token, gameState: GameState): boolean {
  let checkFn = (el: Token) =>
    el != null && el.symbol == token.symbol && el.color == token.color;
  for (let row of gameState.board) {
    const isPresent = row.some(checkFn);
    if (isPresent) {
      return true;
    }
  }
  return gameState.river.some(checkFn);
}

export function isInStock(token: Token) {
  return stock.some(
    (el: Token) =>
      el != null && el.symbol == token.symbol && el.color == token.color
  );
}

export function drawToken(): Token | null {
  if (stock.length == 0) {
    return null;
  }
  const index = Math.floor(Math.random() * stock.length);
  const token = stock[index];
  stock = stock.splice(index, 1);
  visualStock[token.color][token.symbol] = false;
  return token;
}
