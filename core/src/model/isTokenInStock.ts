import { Token } from "../../../cli/src/GameStateTypes";
import { StockState } from "./computeStock";

export const isTokenInStock = (token: Token, stock: StockState) =>
  stock.stock.some(
    (el: Token) =>
      el != null && el.symbol == token.symbol && el.color == token.color,
  );
