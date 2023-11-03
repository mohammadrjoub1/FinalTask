export class AttachJobTitleAndlocationToEmp {
  static attachJobTitleAndlocationToEmp() {
    cy.get("@employeeNumber").then((employeeNumber) => {
      cy.get("@locationId").then((locationId) => {
        cy.get("@jobTitleId").then((jobTitleId) => {
          cy.log(`emplyee is id :${employeeNumber}`);
          cy.log(` location id is:${locationId}`);
          cy.log(` jobTitle id is:${jobTitleId}`);

          cy.attachJobTitleAndlocationToEmp(jobTitleId, locationId, employeeNumber);
        });
      });
    });
  }
}
