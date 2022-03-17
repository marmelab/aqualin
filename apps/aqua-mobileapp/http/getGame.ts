import { AQUALIN_URL } from "@env";
import { NavigationProp } from "@react-navigation/native";

import { RootStackParamList } from "../types";
import { getJwt } from "../utils/asyncStorage";

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
        Authorization: "Bearer " + (await getJwt()),
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
