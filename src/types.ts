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
