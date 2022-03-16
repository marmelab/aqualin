import { Cell, GameState, Token } from "@aqua/core";
import { Text, View } from "./Themed";
import { StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { Symbols } from "../constants/Symbols";
import { TokenColors } from "../constants/TokenColors";

interface CellProps {
  gameState: GameState;
  row: number;
  column: number;
}

export const BoardCell = ({ gameState, row, column }: CellProps) => {
  const cell = gameState.board[row][column];
  if (cell) {
    return tokenCell({ gameState, row, column });
  }
  return emptyCell({ gameState, row, column });
};

const tokenCell = ({ gameState, row, column }: CellProps) => {
  const cell = gameState.board[row][column] as Token;
  return (
    <View
      style={[styles.cell, styles[`color${cell.color}` as keyof typeof styles]]}
    >
      <Image
        resizeMode="contain"
        style={styles.image}
        source={Symbols[cell.symbol]}
      />
    </View>
  );
};

const emptyCell = ({ gameState, row, column }: CellProps) => {
  return <Text style={styles.cell}></Text>;
};

const styles = StyleSheet.create({
  cell: {
    height: 55,
    width: 55,
    backgroundColor: Colors.board.backgroundColor,
    borderColor: "#fdebd0",
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxHeight: 50,
    maxWidth: 50,
  },
  ...TokenColors,
});
