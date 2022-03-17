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
  gameId: number;
  index: number;
}

export const RiverCell = ({ gameTemplate, index, gameId }: CellProps) => {
  const cell = gameTemplate.gameState.river[index];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  let isSelected = false;
  if (
    gameTemplate.gameState.selectedTokenFromRiver &&
    gameTemplate.gameState.selectedTokenFromRiver === index
  ) {
    isSelected = true;
  }
  if (cell) {
    return !gameTemplate.isPlayerTurn ? (
      <UIToken token={cell} />
    ) : (
      <TouchableHighlight
        onPress={() => registerAction(null, index, gameId, navigation)}
      >
        <UIToken token={cell} selected={isSelected} />
      </TouchableHighlight>
    );
  } else {
    return <Text style={styles.cell} />;
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxHeight: 50,
    maxWidth: 50,
  },
  ...TokenColors,
});
