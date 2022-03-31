import { AiTurn, GameState } from "../../types";
import { playTurn } from "../playTurn";

export const playAiTurn = (gameState: GameState, aiTurn: AiTurn) => {
  console.log("AI resultat ", aiTurn);
  console.log("IA GS", gameState);
  if (aiTurn.move) {
    gameState = playTurn(gameState, aiTurn.move.source).gameState;
    gameState = playTurn(gameState, aiTurn.move.target).gameState;
  }
  gameState = playTurn(gameState, {
    row: null,
    column: aiTurn.place.indexRiverToken,
  }).gameState;
  gameState = playTurn(gameState, aiTurn.place.coordinates).gameState;
  console.log("gS after", gameState);
  return gameState;
};
