export default {
  elements: {
    url: "/",
    newGameForm: "#newGameForm",
    gameFromFileForm: "#gameFromFileForm",
  },

  navigate() {
    cy.visit(this.elements.url);
  },

  waitUntilVisible() {
    cy.contains("Aqualin");
  },
  startNewGame() {
    cy.get(this.elements.newGameForm).contains("New game").click();
  },

  startNewGameFromFile() {
    cy.get(this.elements.gameFromFileForm)
      .contains("New example game from file")
      .click();
  },
};
