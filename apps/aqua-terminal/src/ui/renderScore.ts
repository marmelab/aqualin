import { PlayerColor, Score, PlayerSymbol } from "@aqua/core";

import { Colors } from "./Colors";

export const renderScore = (score: Score): void => {
  console.log(congratulatePlayer(score));
  console.log("Results :");
  console.log("\tColor: " + score.color);
  console.log("\tSymbol: " + score.symbol);
};

const congratulatePlayer = (score: Score): string => {
  let res = "And the winner is : ";
  if (score.color === score.symbol) {
    res += Colors.red + "draw";
  } else {
    res +=
      Colors.yellow + (score.color > score.symbol ? PlayerColor : PlayerSymbol);
  }
  res += Colors.reset;
  return res;
};
