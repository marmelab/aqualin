import { Token } from "./GameStateTypes";

export type Location = { column: number; row: number };
export type LocationInputs = {
  sourceLocation: Location;
  targetLocation: Location;
};
export type TokenToPlace = {
  choosenToken: number;
  location: Location;
};
export type Turn = {
  locationInputs: LocationInputs;
  tokenToPlace: TokenToPlace;
};
