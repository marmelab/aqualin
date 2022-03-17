import { Score } from "@aqua/core";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";


export const ScoreScreen = ({ route }: RootStackScreenProps<"Score">) => {
    const score = route.params.score;
    return (
        <View style={styles.container}>
            <Text>And the winner is</Text>
            <Text style={styles.winner}>{getWinner(score)}</Text>
            <Text style={styles.pointsTitle}>Points</Text>
            <Text style={styles.points}>Color : {score.color}</Text>
            <Text style={styles.points}>Symbol : {score.symbol}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    pointsTitle: {
        paddingTop: 10
    },
    points: {
        paddingTop: 5,
        paddingLeft: 10
    },
    winner: {
        padding: 30,
        color: "gold",
        fontSize: 32
    }
});

const getWinner = (score: Score) => {
    if (score.color === score.symbol) {
        return "draw";
    }
    if (score.color > score.symbol) {
        return "Color";
    } 
    return "Symbol";
}
