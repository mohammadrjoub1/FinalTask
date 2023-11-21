// cypress/support/commands.d.ts

declare namespace Cypress {
    interface Chainable {
      logIn(username: string, password: string): void;
      logOut(): void;
    }
  }
  