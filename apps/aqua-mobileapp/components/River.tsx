import { Cell, Token } from "@aqua/core";
import { View } from "./Themed";
import { StyleSheet } from "react-native";
import { UICell } from "./UICell";
export const River = ({ river }: { river: Token[] }) => {
    return <View style={styles.board}>{river.map((token, index) => {
        return <UICell key={index} cell={token}></UICell>
      })}</View>
};

const styles = StyleSheet.create({
    board: {
        flexDirection:'row',
        borderRadius: 4,
        padding: 5,
        backgroundColor: "#a9cce3",
    }
})
