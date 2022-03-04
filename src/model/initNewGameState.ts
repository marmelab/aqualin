/**
 * Return a emty game state with empty river
 * @param size size of the board
 * @returns a new game state
 */
export const initNewGameState = (size = 3) => {
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
};
