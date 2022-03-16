import { Cell, GameState } from "@aqua/core";
import { Text, View } from "./Themed"
import { StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { Symbols } from "../constants/Symbols";
import { TokenColors } from "../constants/TokenColors";

interface CellProps {
  gameState: GameState,
  index: number
}

export const RiverCell = ({ gameState, index }: CellProps) => {
  const cell = gameState.river[index];
  if (cell) {
    return <View style={[styles.cell, styles[`color${cell.color}` as keyof typeof styles ]]}>
      <Image resizeMode="contain" style={styles.image} source={Symbols[cell.symbol]} /></View>
  } else {
    return <Text style={styles.cell}></Text>
  }
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxHeight: 50,
    maxWidth: 50,
  },
  ...TokenColors
})
