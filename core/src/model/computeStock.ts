import { GameState, Token } from "../../../cli/src/GameStateTypes";
import { isTokenInState } from "./isTokenInState";

export type Stock = Token[];
export type StockState = { stock: Stock; visualStock: Array<Array<boolean>> };

export const computeStock = (gameState: GameState): StockState => {
  const state = {
    stock: [],
    visualStock: [],
  };

  for (let row = 0; row < gameState.board.length; row++) {
    if (!state.visualStock[row]) {
      state.visualStock[row] = [];
    }
    for (let column = 0; column < gameState.board.length; column++) {
      const token = { color: row, symbol: column };
      if (!isTokenInState(token, gameState)) {
        state.stock.push(token);
        state.visualStock[row][column] = true;
      } else {
        state.visualStock[row][column] = false;
      }
    }
  }
  return state;
};
