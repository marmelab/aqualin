import { Cell, Token } from "aqua-core";

import { DataColors } from "./Colors";
import { Symbols } from "./Symbols";

export function renderCell(cell: Cell): string {
  if (cell) {
    return renderToken(cell);
  }
  return renderEmptyToken();
}

export function renderToken(token: Token): string {
  const color = DataColors[token.color];
  const symbol = Symbols[token.symbol];
  return '<div style="color:' + color + ';">' + symbol + "</div>";
}

export function renderEmptyToken(): string {
  return "   ";
}
