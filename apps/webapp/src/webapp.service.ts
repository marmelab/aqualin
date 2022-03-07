import { Injectable } from "@nestjs/common";

@Injectable()
export class WebappService {
  getAqualinGame = (): {
    playerOne: { name: string; role: string };
    playerTwo: { name: string; role: string };
    board: Array<Array<string | null>>;
    river: Array<string | null>;
  } => {
    return {
      playerOne: { name: "Norbert", role: "Color" },
      playerTwo: { name: "Nanny", role: "Symbol" },
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
