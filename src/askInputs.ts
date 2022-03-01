import readline from "readline";
import prompt from "prompt";
import { axis } from "./axis";

export type Location = { column: string; row: string };
export type LocationInputs = {
  sourceLocation: Location;
  targetLocation: Location;
};

export async function askInputs(boardSize: number): Promise<LocationInputs> {
  let locationInputs: LocationInputs;

  prompt.start();
  while (true) {
    let { moveInput } = await prompt.get([
      {
        name: "moveInput",
        description: "Enter your move (ex: A1 B1)",
        required: true,
      },
    ]);

    let inputs = moveInput.split(" ");
    if (inputs.length === 2) {
      const [sourceLocation, targetLocation] = inputs;
      const [sourceColumn, sourceRow] = sourceLocation.split("");
      const [targetColumn, targetRow] = targetLocation.split("");
      if (
        0 <= parseInt(axis[sourceColumn]) &&
        parseInt(axis[sourceColumn]) < boardSize &&
        0 <= parseInt(axis[targetColumn]) &&
        parseInt(axis[targetColumn]) < boardSize &&
        0 <= sourceRow - 1 &&
        sourceRow - 1 < boardSize &&
        0 <= targetRow - 1 &&
        targetRow - 1 < boardSize
      ) {
        locationInputs = {
          sourceLocation: { column: sourceColumn, row: sourceRow },
          targetLocation: { column: targetColumn, row: targetRow },
        };
        return locationInputs;
      } else {
        console.log("Wrong inputs");
      }
    }
  }
}
