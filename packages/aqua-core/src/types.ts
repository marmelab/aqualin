import { PlayerColor, PlayerSymbol } from "./Players";

export type Coordinates = { column: number; row: number };
export type Move = {
  source: Coordinates;
  target: Coordinates;
};
export type TokenToPlace = {
  indexRiverToken: number;
  coordinates: Coordinates;
};
export type IATurn = {
  move?: Move;
  place?: TokenToPlace;
};
export type MinMaxGameStateTurn = IATurn & {
  gameState?: GameState;
};
export type BestMinMaxGameStateGap = {
  minMaxGameStateTurn?: MinMaxGameStateTurn;
  gap?: number;
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

export type Player = typeof PlayerSymbol | typeof PlayerColor;

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

export type DetailMovesToBiggerCluster = {
  source: Coordinates;
  moves: Coordinates[];
};

export type MovesToBiggerCluster = (Coordinates[] | null)[][];
export type BooleanBoard = boolean[][];
export type IntermediateScore = { myScore: number; opponentScore: number };

export type PlacementsFromRiver = Coordinates[][];
