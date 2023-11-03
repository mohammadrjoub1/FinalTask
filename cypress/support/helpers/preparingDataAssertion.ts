export class PreparingDataAssertion {
  static preparingDataAssertion() {
    cy.get(":nth-child(2) > .oxd-main-menu-item").click();
    cy.get(".orangehrm-container").should("include.text", "mohammad jamal");
    cy.get(".orangehrm-container").should("include.text", "ahmed jamal");
    cy.get(".orangehrm-container").should("include.text", "mahmoud jamal");
  }
}
