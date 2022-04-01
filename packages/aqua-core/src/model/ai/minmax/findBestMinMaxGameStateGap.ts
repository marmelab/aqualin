import {
  BestMinMaxGameStateGap,
  GameState,
  MinMaxGameStateTurn,
  Token,
} from "../../../types";
import { calculateGap } from "../calculateIntermediateScore";
import { getFirstPlacementFromRiver } from "./addRiverPlacements";

export const findBestMinMaxGameStateGap = (
  minMaxGameStatesTurn: MinMaxGameStateTurn[],
  gameState: GameState,
  player: keyof Token,
  opponent: keyof Token,
) => {
  const bestMinMaxGameStateGap: BestMinMaxGameStateGap = {
    gap: -1000,
    minMaxGameStateTurn: {
      place: {
        indexRiverToken: 0,
        coordinates: getFirstPlacementFromRiver(gameState),
      },
    },
  };

  minMaxGameStatesTurn.forEach((minMaxGameStateTurn) => {
    const newGap = calculateGap(
      minMaxGameStateTurn.gameState,
      player,
      opponent,
    );

    if (!bestMinMaxGameStateGap.gap || newGap > bestMinMaxGameStateGap.gap) {
      bestMinMaxGameStateGap.gap = newGap;
      bestMinMaxGameStateGap.minMaxGameStateTurn = minMaxGameStateTurn;
    }
  });
  return bestMinMaxGameStateGap;
};
