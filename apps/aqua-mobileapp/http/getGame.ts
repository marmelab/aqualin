import { AQUALIN_URL } from "@env";
import { NavigationProp } from "@react-navigation/native";

import { GameTemplate, RootStackParamList } from "../types";
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
        const gameTemplate = json as GameTemplate;
        if (gameTemplate.score) {
          navigation.navigate("Score", { score: gameTemplate.score });
        } else {
          navigation.navigate("Game", { gameTemplate });
        }
      });
  } catch (error) {
    console.error(error);
  }
};
