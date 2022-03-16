import { GameState, Token } from "@aqua/core";
import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";
import { TokenColors } from "../constants/TokenColors";
import { GameTemplate, RootStackParamList } from "../types";
import { Text } from "./Themed";
import { UIToken } from "./UIToken";

interface CellProps {
  gameTemplate: GameTemplate;
  row: number;
  column: number;
}

export const BoardCell = ({ gameTemplate, row, column }: CellProps) => {
  const cell = gameTemplate.gameState.board[row][column];
  if (cell) {
    return tokenCell({ gameTemplate, row, column });
  }
  return emptyCell({ gameTemplate, row, column });
};

const tokenCell = ({ gameTemplate, row, column }: CellProps) => {
  const cell = gameTemplate.gameState.board[row][column] as Token;
  if (!gameTemplate.isPlayerTurn || gameTemplate.gameState.moveDone) {
    return <UIToken token={cell}></UIToken>;
  } else if (
    gameTemplate.gameState.selectedCoordinatesFromBoard &&
    gameTemplate.gameState.selectedCoordinatesFromBoard.row === row &&
    gameTemplate.gameState.selectedCoordinatesFromBoard.column === column
  ) {
    return <UIToken token={cell} selected={true}></UIToken>;
  }
  if (tokenBlocked(gameTemplate.gameState, { row: row, column: column })) {
    return <UIToken token={cell}></UIToken>;
  }
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableHighlight onPress={() => console.log("Hey")}>
      <UIToken token={cell}></UIToken>
    </TouchableHighlight>
  );
};

const emptyCell = ({ gameTemplate, row, column }: CellProps) => {
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

async function registerAction(
  column: number,
  row: number,
  gameId: number,
  navigation: NavigationProp<RootStackParamList>,
) {
  try {
    return await fetch(AQUALIN_URL + "/api/games/" + gameId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        column: column,
        row: row,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        navigation.navigate("Game", { gameTemplate: json });
      });
  } catch (error) {
    console.error(error);
  }
}

function tokenBlocked(
  gameState: GameState,
  arg1: { row: number; column: number },
) {
  return false;
}
