import fs from "fs";

import { askInputs } from "./askInputs";
import { GameState } from "./GameStateTypes";
import { fillRiver } from "./model/fillRiver";
import { highlightCoordinates } from "./model/highlightCoordinates";
import { initNewGameState } from "./model/initNewGameState";
import { playTurn } from "./model/playTurn";
import { drawGameState } from "./ui/drawGameState";

export async function main(args: string[]) {
  let gameState = initGameState(args);

  gameState = fillRiver(gameState);

  const boardSize = gameState.board.length;
  const riverSize = gameState.river.length;

  drawGameState(gameState);

  while (gameState.river.length !== 0) {
    let turnIsFinished = false;
    while (!turnIsFinished) {
      try {
        const turn = await askInputs(boardSize, riverSize);
        if (turn.coordinates) {
          //highlight possibilities
          drawGameState(highlightCoordinates(turn.coordinates, gameState));
          continue;
        }
        gameState = playTurn(gameState, turn);
        drawGameState(gameState);
        turnIsFinished = true;
      } catch (e) {
        console.log(e.message);
        // do nothing and iterate again in the while loop
      }
    }

    drawGameState(gameState);
  }
}

export const initGameState = (args: string[]) => {
  if (args && args.length > 2) {
    return initGameStateFromFile(args);
  }
  return initNewGameState();
};

const initGameStateFromFile = (args: string[]) => {
  const gameArgs = args.slice(2);
  const fileName = gameArgs[0].split("=")[1];
  const data = fs.readFileSync(fileName, "utf8");
  return JSON.parse(data) as GameState;
};
