import { GameState, Token } from "../../types";
import { isHighlightToken } from "../highlightCoordinates";

export const noRemainingTokenTypesFromStockOrRiver = (
  gameState: GameState,
  player: keyof Token,
) => {
  const noRemainingTokenTypes = [];
  const maxNumberOfTokenType = gameState.board.length;
  const boardTokenCountByTeam = {};

  gameState.board.forEach((row) => {
    row.forEach((token) => {
      if (token == null || isHighlightToken(token)) {
        return;
      }

      if (!boardTokenCountByTeam[token[player]]) {
        boardTokenCountByTeam[token[player]] = 1;
        return;
      }

      boardTokenCountByTeam[token[player]] += 1;
      if (boardTokenCountByTeam[token[player]] === maxNumberOfTokenType) {
        noRemainingTokenTypes.push(token[player]);
      }
    });
  });

  return noRemainingTokenTypes;
};
