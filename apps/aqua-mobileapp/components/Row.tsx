import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { GameTemplate } from "../types";
import { BoardCell } from "./BoardCell";
import { View } from "./Themed";

export interface RowProps {
  gameTemplate: GameTemplate;
  row: number;
  gameId: number;
}
export const Row = (props: RowProps) => {
  const { gameTemplate, row, gameId }: RowProps = props;

  return (
    <View style={styles.row}>
      {gameTemplate.gameState.board[row].map((cell, index) => (
        <BoardCell
          key={index}
          gameTemplate={gameTemplate}
          row={row}
          column={index}
        ></BoardCell>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: Colors.board.backgroundColor,
  },
});
