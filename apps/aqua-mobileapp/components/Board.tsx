import { GameState } from "@aqua/core";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Row } from "./Row";
import { View } from "./Themed";

export interface BoardProps {
  gameState: GameState;
  gameId: number;
}

export const Board = (props: BoardProps) => {
  const { gameState, gameId }: BoardProps = props;
  return (
    <View style={styles.board}>
      {gameState.board.map((row, index) => {
        return (
          <Row
            key={index}
            gameState={gameState}
            row={index}
            gameId={gameId}
          ></Row>
        );
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
