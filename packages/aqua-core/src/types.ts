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

export const Symbol = "Symbol";
export const Color = "Color";

export type Player = typeof Symbol | typeof Color;

export type Action = {
  row?: Coordinates;
};

export type Token = { color: number; symbol: number };
export type Cell = Token | null;
export type Board = Cell[][];
export type River = Token[];
export type GameState = {
  board: Board;
  river: River;
  selectedCoordinatesFromBoard?: Coordinates;
  selectedTokenFromRiver?: number;
  moveDone: boolean;
  playerTurn: Player;
};
