export default {
  elements: {
    url: "/game/",
    newGameForm: "newGameForm",
    gameFromFileForm: "gameFromFileForm",
  },

  navigate() {
    cy.visit(this.elements.url);
  },

  waitUntilVisible() {
    cy.url().should('include', '/game/') 
    cy.contains("Board");
  },
  startNewGame() {
    cy.get(this.elements.newGameForm).get("New Game").click();
  },
};
