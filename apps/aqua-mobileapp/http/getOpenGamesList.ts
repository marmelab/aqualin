import { AQUALIN_URL } from "@env";

import { getJwt } from "../utils/asyncStorage";

export const getOpenGamesList = async () => {
  try {
    return await fetch(AQUALIN_URL + "/api/games/open", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getJwt()),
      },
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response.statusText;
      })
      .then((json) => {
        return json;
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.error(error);
  }
};
