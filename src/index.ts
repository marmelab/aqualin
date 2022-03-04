import { exit } from "process";

import { main } from "./GameEngine";

if (
  process.argv.length > 2 &&
  (process.argv[2].indexOf("-h") >= 0 || process.argv[2].indexOf("--help") >= 0)
) {
  console.log("Usage:");
  console.log("\tno parameters to start a new game from scratch");
  console.log("\t-f=fileName  to start a game from a game file");
  console.log("\t-s=9 to specify game board to of size 9");
  let message = `\nAqualin is a competitive game. Two players are required to play the game, one choose colors, the other symbols.

  Each player need to have the most score by creating cluster.
  Score depends of the size of each cluster. Bigger cluster give more points. The bigger, the better thay are.
  
  +-------------------------------+---+---+---+----+----+
  | Number of cell in the cluster | 2 | 3 | 4 | 5  | 6  |
  +-------------------------------+---+---+---+----+----+
  | Points rewarded               | 1 | 3 | 6 | 10 | 15 |
  +-------------------------------+---+---+---+----+----+
  
  PLayers play one after the other.
  Each turn is composed:
     - first, move a token from the board to an other cell (no mandatory). The move can only be a move on same column
      or the same row, and the path between them needs o be empty.It can be done once per turn. 
     - second, place a token from the river on the board.
  
  `;
  console.log(message);
  exit(0);
}

main(process.argv);
