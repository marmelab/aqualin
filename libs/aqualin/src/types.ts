export type Coordinates = { column: number; row: number };
export type Move = {
  source: Coordinates;
  target: Coordinates;
};
export type TokenToPlace = {
  indexRiverToken: number;
  coordinates: Coordinates;
};
export type Turn = {
  move?: Move;
  tokenToPlace?: TokenToPlace;
  coordinates?: Coordinates;
};
export type Direction = "row" | "column";

export type Score = {
  symbol: number;
  color: number;
};

export type Player = "Symbol" | "Color";

export type Action = {
  row?: Coordinates;
};