import { AiTurn, GameState, NotifyAction } from "../../types";
import { playTurn } from "../playTurn";

export const playAiTurn = (
  gameState: GameState,
  aiTurn: AiTurn,
  notify: NotifyAction,
  exploredPossibilities: number,
) => {
  const timerIncrement = 1000;
  let timer = timerIncrement;
  if (aiTurn.move) {
    gameState = playTurn(gameState, aiTurn.move.source).gameState;
    notify(gameState, exploredPossibilities);
    setTimeout(() => {
      gameState = playTurn(gameState, aiTurn.move.target).gameState;
      notify(gameState, exploredPossibilities);
    }, timer);
    timer += timerIncrement;
  }
  setTimeout(() => {
    gameState = playTurn(gameState, {
      row: null,
      column: aiTurn.place.indexRiverToken,
    }).gameState;
    notify(gameState, exploredPossibilities);
  }, timer);
  timer += timerIncrement;

  setTimeout(() => {
    gameState = playTurn(gameState, aiTurn.place.coordinates).gameState;
    notify(gameState, exploredPossibilities);
  }, timer);
};
