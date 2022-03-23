import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { GameTemplate } from "../types";
import { Row } from "./Row";
import { View } from "./Themed";

export interface BoardProps {
  gameTemplate: GameTemplate;
}

export const Board = (props: BoardProps) => {
  const { gameTemplate }: BoardProps = props;
  return (
    <View style={styles.board}>
      {gameTemplate.gameState.board.map((row, index) => {
        return <Row key={index} gameTemplate={gameTemplate} row={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    borderRadius: 4,
    padding: 5,
    backgroundColor: Colors.board.backgroundColor,
  },
});
