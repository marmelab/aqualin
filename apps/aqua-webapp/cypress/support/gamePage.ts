/// <reference types="cypress" />

export default {
  elements: {
    url: "/game/",
    newGameForm: "#newGameForm",
  },

  navigate() {
    cy.visit(this.elements.url);
  },

  waitUntilVisible() {
    cy.url().should("include", "/game/");
    cy.contains("Board");
  },
  startNewGame() {
    cy.get(this.elements.newGameForm).contains("New game").click();
  },
};
