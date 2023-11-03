export class DeleteAllData {
  static deleteEverything() {
    cy.log(`****************************************************`);
    cy.log(`****************************************************`);
    cy.log(`Delete 3 employees and job title and location i added in the beforeEach`);

    cy.get("@employeemohammad").then((empNumber) => {
      cy.deleteEmployee(empNumber);
    });
    cy.get("@employeeahmed").then((empNumber) => {
      cy.deleteEmployee(empNumber);
    });
    cy.get("@employeemahmoud").then((empNumber) => {
      cy.deleteEmployee(empNumber);
    });
    cy.get("@jobTitleId").then((jobTitleId) => {
      cy.deleteJobTitle(jobTitleId);
    });
    cy.get("@locationId").then((locationId) => {
      cy.deleteLocation(locationId);
    });
  }
}
