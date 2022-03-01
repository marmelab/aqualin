import { Serializer } from "v8";
import { Token } from "./GameStateType";

export type Stock = Token[];
const stock: Stock = [];

export function initStock(size: number) {
  for (let row = 0; row < size; row++) {
    for (let colunm = 0; colunm < size; colunm++) {
        stock.push({symbol: })
    }
  }
}
