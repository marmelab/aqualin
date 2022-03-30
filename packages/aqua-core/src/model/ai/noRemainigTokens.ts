import { PlayerColor } from "../../Players";
import { GameState, Player } from "../../types";

export const noRemainingTokenTypesFromStockOrRiver = (
  gameState: GameState,
  playerTeam: Player,
) => {
  const noRemainingTokenTypes = [];
  const player = playerTeam === PlayerColor ? "color" : "symbol";
  const maxNumberOfTokenType = gameState.board.length;
  const boardTokenCountByTeam = {};

  gameState.board.forEach((row) => {
    row.forEach((token) => {
      if (token == null) {
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
