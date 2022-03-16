import { Token } from "@aqua/core";
import { Image, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
import { Symbols } from "../constants/Symbols";
import { TokenColors } from "../constants/TokenColors";
import { View } from "./Themed";

export const UIToken = ({
  token,
  selected,
}: {
  token: Token;
  selected?: boolean;
}) => {
  return (
    <View
      style={[
        styles.cell,
        styles[`color${token.color}` as keyof typeof styles],
        selected ? styles.selected : undefined,
      ]}
    >
      <Image
        resizeMode="contain"
        style={styles.image}
        source={Symbols[token.symbol]}
      />
    </View>
  );
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
  selected: {
    borderWidth: 5,
    borderColor: "gold",
  },
  ...TokenColors,
});
