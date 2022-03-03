import { GameState } from "../GameStateTypes";
import { computeStock } from "./computeStock";

export const drawToken = (state: GameState) => {
  const stock = computeStock(state);
  if (stock.stock.length == 0) {
    return null;
  }
  let index = Math.floor(Math.random() * stock.stock.length);
  let token = stock.stock[index];
  stock.stock.splice(index, 1);
  stock.visualStock[token.color][token.symbol] = false;
  return token;
};
