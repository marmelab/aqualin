/// <reference types="cypress" />
import GamePage from "../support/gamePage";
import HomePage from "../support/homePage";

describe("The new game page", () => {
  const homePage = HomePage;
  const gamePage = GamePage;

  beforeEach(() => {
    homePage.navigate();
    homePage.waitUntilVisible();
    homePage.startNewGame();
  });
  it("should load successfully", () => {
    gamePage.waitUntilVisible();
  });
  it("should have link to start a new game", () => {
    gamePage.startNewGame();
    gamePage.waitUntilVisible();
  });
});
