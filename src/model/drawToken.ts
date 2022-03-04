import { GameState } from "../GameStateTypes";
import { computeStock } from "./computeStock";

export const drawToken = (state: GameState) => {
  const stock = computeStock(state);
  if (stock.stock.length == 0) {
    return null;
  }
  let index = Math.floor(Math.random() * stock.stock.length);
  return stock.stock[index];
};
