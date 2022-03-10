import { GameState, Score } from "@aqua/core";

export type Player = { name: string; role: string; turn: boolean };
export type Game = {
  playerOne: Player;
  playerTwo: Player;
  gameState: GameState;
  message?: string;
  score?: Score;
};
