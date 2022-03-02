import { GameState } from "./GameStateTypes";
import fs from "fs";
import { drawGameState } from "./drawGameState";
import { askInputs } from "./askInputs";
import { moveToken } from "./moveToken";
import { createStockManager, StockManager } from "./stock";

export async function main(args: string[]) {
  const gameState = initGameState(args);

  const stockManager = createStockManager(gameState);
  fillRiver(gameState, stockManager);

  let newGameState: GameState;
  const boardSize = gameState.board.length;

  drawGameState(gameState, stockManager);

  while (!newGameState) {
    const locationInputs = await askInputs(boardSize);
    newGameState = await moveToken(locationInputs, gameState);
  }
  drawGameState(newGameState, stockManager);
}

export function initGameState(args: string[]): GameState {
  if (args && args.length > 2) {
    return initGameStateFromFile(args);
  }
  return initNewGameState();
}
function initGameStateFromFile(args: string[]): GameState {
  const myArgs = args.slice(2);
  const myConfigFileName = myArgs[0].split("=")[1];
  const data = fs.readFileSync(myConfigFileName, "utf8");
  return JSON.parse(data) as GameState;
}

/**
 * Return a emty game state with empty river
 * @param size size of the board
 * @returns a new game state
 */
function initNewGameState(size = 3): GameState {
  const board = [];
  for (let row = 0; row < size; row++) {
    let rowContent = [];
    for (let column = 0; column < size; column++) {
      rowContent.push(null);
    }
    board.push(rowContent);
  }
  const river = [];
  return { board: board, river: [] };
}

export function fillRiver(gameState: GameState, stockManager: StockManager) {
  const boardSize = gameState.board.length;
  const missingTokenInRiver = boardSize - gameState.river.length;
  for (let i = 0; i < missingTokenInRiver; i++) {
    gameState.river.push(stockManager.drawToken());
  }
}
