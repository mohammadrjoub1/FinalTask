/// <reference types="cypress" />

import "cypress-file-upload";

// commands.js or commands.ts

// cypress/support/commands.ts

Cypress.Commands.add("login", (username: string, password: string) => {
    cy.visit("/auth/login");
    cy.get(":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input").type(username);
    cy.get(":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input").type(password);
    cy.get(".oxd-button").click();

});
