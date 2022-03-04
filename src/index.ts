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
  exit(0);
}

main(process.argv);
