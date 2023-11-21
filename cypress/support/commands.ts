/// <reference types="cypress" />

import "cypress-file-upload";

// commands.js or commands.ts

// cypress/support/commands.ts

Cypress.Commands.add("logIn", (username: string, password: string) => {
  cy.visit("/auth/login");
  cy.get('[placeholder="Username"]').type(username);
  cy.get('[placeholder="Password"]').type(password);
  cy.get('[type="submit"]').click();
});
Cypress.Commands.add("logOut", () => {
  cy.get(".oxd-userdropdown-tab > .oxd-icon").click();
  cy.get(":nth-child(4) > .oxd-userdropdown-link").click();
});
