import fs from "fs";

import { PlayerColor, PlayerSymbol } from "../Players";
import { GameState } from "../types";
import { fillRiver } from "./fillRiver";

export const initGameState = (args: string[]): GameState => {
  if (args.length > 2 && args[2].indexOf("-f=") >= 0) {
    const gameArgs = args.slice(2);
    const fileName = gameArgs[0].split("=")[1];
    return initGameStateFromFile(fileName);
  }
  if (args.length > 2 && args[2].indexOf("-s=") >= 0) {
    const gameArgs = args.slice(2);
    const size = gameArgs[0].split("=")[1];
    return initNewGameState(parseInt(size));
  }
  return initNewGameState();
};

export const initGameStateFromFile = (fileName: string): GameState => {
  const data = fs.readFileSync(fileName, "utf8");
  return fillRiver(JSON.parse(data) as GameState);
};

/**
 * Return a emty game state with empty river
 * @param size size of the board
 * @returns a new game state
 */
export const initNewGameState = (size = 6): GameState => {
  const board = [];
  for (let row = 0; row < size; row++) {
    const rowContent = [];
    for (let column = 0; column < size; column++) {
      rowContent.push(null);
    }
    board.push(rowContent);
  }
  return fillRiver({
    board,
    river: [],
    moveDone: false,
    playerTurn: Math.round(Math.random()) === 1 ? PlayerColor : PlayerSymbol,
  });
};
