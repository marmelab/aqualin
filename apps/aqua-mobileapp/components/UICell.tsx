import { Cell } from "@aqua/core";
import { Text } from "./Themed"
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
export const UICell = ({ cell }: { cell: Cell }) => {
  if (cell) {
    return <Text style={styles.cell}>{cell.symbol}-{cell.color}</Text>
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
    margin: 2
  }
})
