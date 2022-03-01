export type Token = { color: number; symbol: number };
export type Cell = Token | null;
export type Board = Array<Array<Cell>>;
export type River = Array<Token>;
export type GameState = {
  board: Board;
  river: River;
};
