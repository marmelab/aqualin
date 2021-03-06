import { AQUALIN_URL } from "@env";
import { NavigationProp } from "@react-navigation/native";

import { GameTemplate, RootStackParamList } from "../types";

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
        const gameTemplate = json as GameTemplate;
        navigation.navigate("Game", { gameTemplate });
      });
  } catch (error) {
    console.error(error);
  }
};
