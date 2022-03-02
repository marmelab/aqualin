import { GameState, Token } from "./GameStateTypes";
export type Stock = Token[];
export type StockState = { stock: Stock; visualStock: Array<Array<boolean>> };

const isPresentIngame = (state: StockState) => ({
  isPresentIngame: (token: Token, gameState: GameState) => {
    const checkFn = (el: Token) =>
      el != null && el.symbol == token.symbol && el.color == token.color;
    for (let row of gameState.board) {
      const isPresent = row.some(checkFn);
      if (isPresent) {
        return true;
      }
    }
    return gameState.river.some(checkFn);
  },
});

const isInStock = (state: StockState) => ({
  isInStock: (token: Token) => {
    return state.stock.some(
      (el: Token) =>
        el != null && el.symbol == token.symbol && el.color == token.color
    );
  },
});

const drawToken = (state: StockState) => ({
  drawToken: () => {
    if (state.stock.length == 0) {
      return null;
    }
    let index = Math.floor(Math.random() * state.stock.length);
    let token = state.stock[index];
    state.stock.splice(index, 1);
    state.visualStock[token.color][token.symbol] = false;
    return token;
  },
});

const resetStock = (state: StockState) => ({
  resetStock: () => (state.stock = []),
});

export const createStockManager = (gameState: GameState) => {
  const state: StockState = {
    stock: [],
    visualStock: [],
  };

  for (let row = 0; row < gameState.board.length; row++) {
    if (!state.visualStock[row]) {
      state.visualStock[row] = [];
    }
    for (let column = 0; column < gameState.board.length; column++) {
      let token = { color: row, symbol: column };
      if (!isPresentIngame(state).isPresentIngame(token, gameState)) {
        state.stock.push(token);
        state.visualStock[row][column] = true;
      } else {
        state.visualStock[row][column] = false;
      }
    }
  }

  return {
    ...state,
    ...drawToken(state),
    ...isInStock(state),
    ...isPresentIngame(state),
    ...resetStock(state),
  };
};

export type StockManager = ReturnType<typeof createStockManager>;
