import { Cell } from "@aqua/core";
import { View } from "./Themed";
import { StyleSheet } from "react-native";
import { Row } from "./Row"
import Colors from "../constants/Colors";
export const Board = ({ board }: { board: Cell[][] }) => {
    return <View style={styles.board}>{board.map((row, index) => {
        return <Row key={index} row={row}></Row>
      })}</View>
};

const styles = StyleSheet.create({
    board: {
        borderRadius: 4,
        padding: 5,
        backgroundColor: Colors.board.backgroundColor
    }
})
