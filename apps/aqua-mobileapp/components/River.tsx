import { Cell, GameState, Token } from "@aqua/core";
import { View } from "./Themed";
import { StyleSheet } from "react-native";
import { RiverCell } from "./RiverCell";

export const River = ({
  gameState,
  gameId,
}: {
  gameState: GameState;
  gameId: number;
}) => {
  return (
    <View style={styles.board}>
      {gameState.river.map((_, index) => {
        return (
          <RiverCell
            key={index}
            gameState={gameState}
            index={index}
          ></RiverCell>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#a9cce3",
  },
});
