import { initGameState } from "aqua-core/src";
import { playTurn } from "aqua-core/src/model/playTurn";
import { calculateScore } from "aqua-core/src/model/score";

import { initScreen, renderBoard } from "./ui/renderer";
import { renderScore } from "./ui/renderScore";

export async function main(args: string[]) {
  const screen = initScreen();
  let gameState = initGameState(args);
  let message = "";
  while (gameState.river.length !== 0) {
    const coordinates = await renderBoard(
      gameState,
      screen,
      gameState.playerTurn,
      message,
    );
    try {
      const result = playTurn(gameState, coordinates);
      gameState = result.gameState;
      message = "";
    } catch (e) {
      message = e.message;
    }
  }
  renderBoard(gameState, screen);
  renderScore(calculateScore(gameState));
}
