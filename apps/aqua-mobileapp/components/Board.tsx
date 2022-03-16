import { Cell, GameState } from "@aqua/core";
import { View } from "./Themed";
import { StyleSheet } from "react-native";
import { Row } from "./Row"
import Colors from "../constants/Colors";

export const Board = ({ gameState }: { gameState: GameState }) => {
    return <View style={styles.board}>{gameState.board.map((_, index) => {
        return <Row key={index} gameState={gameState} row={index}></Row>
      })}</View>
};

const styles = StyleSheet.create({
    board: {
        borderRadius: 4,
        padding: 5,
        backgroundColor: Colors.board.backgroundColor
    }
})
