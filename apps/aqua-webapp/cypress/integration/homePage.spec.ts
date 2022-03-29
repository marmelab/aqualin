import GamePage from "../support/gamePage";
import HomePage from "../support/homePage";

describe("The Home Page", () => {
  const homePage = HomePage;
  const gamePage = GamePage;
  beforeEach(() => {
    homePage.navigate();
  });
  it("should load successfully", () => {
    homePage.waitUntilVisible();
  });
  it("should have link to start a new game", () => {
    homePage.startNewGame();
    gamePage.waitUntilVisible();
  });
  it("should have link to start a new game from file", () => {
    homePage.startNewGameFromFile();
    gamePage.waitUntilVisible();
  });
});
