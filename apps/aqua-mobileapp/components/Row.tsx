import React from "react";
import { Cell, GameState } from "@aqua/core";
import { View } from "./Themed";
import { StyleSheet, TouchableHighlight } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";
import { BoardCell } from "./BoardCell";

export interface RowProps {
  gameState: GameState;
  row: number;
  gameId: number;
}
export const Row = (props: RowProps) => {
  const { gameState, row, gameId }: RowProps = props;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  async function registerAction(column: number, row: number) {
    try {
      return await fetch("http://localhost:3000/api/games/" + gameId, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          column: column,
          row: row,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate("Game", { id: json?.id });
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.row}>
      {gameState.board[row].map((cell, index) => (
        <TouchableHighlight onPress={() => registerAction(index, row)}>
          <BoardCell
            key={index}
            gameState={gameState}
            row={row}
            column={index}
          ></BoardCell>
        </TouchableHighlight>
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