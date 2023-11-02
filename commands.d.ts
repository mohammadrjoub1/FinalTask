// cypress/support/commands.d.ts

declare namespace Cypress {
    interface Chainable {
      login(username: string, password: string): void;
    }
  }
  