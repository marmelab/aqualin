import { GameState } from "aqua-core/src";

import { computeStock } from "./computeStock";

export const drawToken = (state: GameState) => {
  const stock = computeStock(state);
  if (stock.stock.length == 0) {
    return null;
  }
  const index = Math.floor(Math.random() * stock.stock.length);
  return stock.stock[index];
};
