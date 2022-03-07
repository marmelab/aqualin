import { GameState } from "../../../cli/src/GameStateTypes";
import { isHighlightToken } from "./highlightCoordinates";

export const hasHighlight = (gameState: GameState): boolean =>
  gameState.board.some((row) => row.some(isHighlightToken));
