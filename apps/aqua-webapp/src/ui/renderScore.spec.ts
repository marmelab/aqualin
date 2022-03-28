import { Score } from "@aqua/core";

import { renderScore } from "./renderScore";

describe("renderScore", () => {
  it("should say that Symbol win when Symbol score > color score", () => {
    const score: Score = {
      color: 12,
      symbol: 15,
    };

    expect(renderScore(score)).toContain(
      '<div>And the winner is :</div><div class="winner">Symbol</div>',
    );
  });

  it("should say that Color win when Color score > Symbol score", () => {
    const score: Score = {
      color: 15,
      symbol: 12,
    };
    const htmlCode = renderScore(score);
    expect(htmlCode).toContain(
      '<div>And the winner is :</div><div class="winner">Color</div>',
    );
  });
  it("should say draw when Color score = PlayerSymbol score", () => {
    const score: Score = {
      color: 15,
      symbol: 15,
    };
    const htmlCode = renderScore(score);

    expect(htmlCode).toContain("<div>draw</div>");
  });
});
