import { StyleSheet } from "react-native";

import { GameTemplate } from "../types";
import { RiverCell } from "./RiverCell";
import { View } from "./Themed";

export const River = ({
  gameTemplate,
  gameId,
}: {
  gameTemplate: GameTemplate;
  gameId: number;
}) => {
  return (
    <View style={styles.board}>
      {gameTemplate.gameState.river.map((_, index) => {
        return (
          <RiverCell
            key={index}
            gameTemplate={gameTemplate}
            gameId={gameId}
            index={index}
           />
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
