import { Injectable } from "@nestjs/common";

@Injectable()
export class WebappService {
  getAqualinGame = (): {
    playerOne: { name: string; role: string; turn: boolean };
    playerTwo: { name: string; role: string; turn: boolean };
    board: Array<Array<string | null>>;
    river: Array<string | null>;
  } => {
    return {
      playerOne: { name: "Norbert", role: "Color", turn: true },
      playerTwo: { name: "Nanny", role: "Symbol", turn: false },
      board: [
        ["A1", null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ],
      river: ["A1", "B2", null, null, null, null],
    };
  };
}
