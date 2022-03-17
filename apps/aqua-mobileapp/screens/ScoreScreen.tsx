import { Score } from "@aqua/core";
import { StyleSheet } from "react-native";

import { Text } from "../components/Themed";
import { RootStackScreenProps } from "../types";


export const ScoreScreen = ({ route }: RootStackScreenProps<"Score">) => {
    const score = route.params.score;
    return (
        <>
            <h1>Score</h1>
            <Text>And the winner is: {getWinner(score)}</Text>
            <Text style={styles.pointsTitle}>Points</Text>
            <Text style={styles.points}>Color : {score.color}</Text>
            <Text style={styles.points}>Symbol : {score.symbol}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    pointsTitle: {
        paddingTop: 10
    },
    points: {
        paddingTop: 5,
        paddingLeft: 10
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
