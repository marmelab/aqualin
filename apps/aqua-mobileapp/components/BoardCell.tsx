import { GameState, Token } from "@aqua/core";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";

import Colors from "../constants/Colors";
import { TokenColors } from "../constants/TokenColors";
import { registerAction } from "../http/registerAction";
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
    return <UIToken token={cell} />;
  } else if (
    gameTemplate.gameState.selectedCoordinatesFromBoard &&
    gameTemplate.gameState.selectedCoordinatesFromBoard.row === row &&
    gameTemplate.gameState.selectedCoordinatesFromBoard.column === column
  ) {
    return <UIToken token={cell} selected />;
  }
  if (tokenBlocked(gameTemplate.gameState, { row, column })) {
    return <UIToken token={cell} />;
  }
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableHighlight
      onPress={() => registerAction(row, column, gameTemplate.id, navigation)}
    >
      <UIToken token={cell} />
    </TouchableHighlight>
  );
};

const emptyCell = ({ gameTemplate, row, column }: CellProps) => {
  if (
    gameTemplate.gameState.selectedTokenFromRiver != null &&
    gameTemplate.isPlayerTurn
  ) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
      <TouchableHighlight
        onPress={() => registerAction(row, column, gameTemplate.id, navigation)}
      >
        <Text style={styles.cell} />
      </TouchableHighlight>
    );
  }
  return <Text style={styles.cell} />;
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

function tokenBlocked(
  gameState: GameState,
  arg1: { row: number; column: number },
) {
  return false;
}
