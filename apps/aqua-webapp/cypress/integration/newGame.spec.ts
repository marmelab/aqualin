/// <reference types="cypress" />

describe("The new game page", () => {
  cy.request("POST", "/new", {});
  it("successfully loads", () => {});
 
});
