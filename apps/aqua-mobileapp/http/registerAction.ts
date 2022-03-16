import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";

import { AQUALIN_URL } from "@env";

export const registerAction = async (
  row: number | null,
  column: number,
  gameId: number,
  navigation: NavigationProp<RootStackParamList>,
) => {
  try {
    return await fetch(AQUALIN_URL + "/api/games/" + gameId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
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
};
