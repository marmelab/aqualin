import { Score } from "@aqua/core";

import { renderScore } from "./renderScore";

describe("renderScore", () => {
  it("it should say that Symbol win when Symbol score > color score", () => {
    const score: Score = {
      color: 12,
      symbol: 15,
    };
    const htmlCode = renderScore(score);
    const wantedResult =
      `<div>Colors : 12</div>` +
      `<div> Symbols: 15</div>` +
      `<div>And the winner is :</div>` +
      `<div class="winner">` +
      `Symbol` +
      `</div>`;
    expect(htmlCode).toBe(wantedResult);
  });

  it("it should say that Color win when Color score > Symbol score", () => {
    const score: Score = {
      color: 15,
      symbol: 12,
    };
    const htmlCode = renderScore(score);
    const wantedResult =
      `<div>Colors : 15</div>` +
      `<div> Symbols: 12</div>` +
      `<div>And the winner is :</div>` +
      `<div class="winner">` +
      `Color` +
      `</div>`;
    expect(htmlCode).toBe(wantedResult);
  });
  it("it should say draw when Color score = Symbol score", () => {
    const score: Score = {
      color: 15,
      symbol: 15,
    };
    const htmlCode = renderScore(score);
    const wantedResult =
      `<div>Colors : 15</div>` + `<div> Symbols: 15</div>` + `<div>draw</div>`;
    expect(htmlCode).toBe(wantedResult);
  });
});
