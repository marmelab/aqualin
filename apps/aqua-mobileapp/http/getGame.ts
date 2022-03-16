import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";

import { AQUALIN_URL } from "@env";

export const getGame = async (
  gameId: number,
  navigation: NavigationProp<RootStackParamList>,
) => {
  try {
    return await fetch(AQUALIN_URL + "/api/games/" + gameId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((json) => {
        navigation.navigate("Game", { gameTemplate: json });
      });
  } catch (error) {
    console.error(error);
  }
};