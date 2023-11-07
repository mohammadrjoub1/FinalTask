import { Employee } from "./employee";
import { JobTitle } from "./jobTitle";
import { Location } from "./location";

export class Delete {
  static deleteEverything() {
    cy.log(`****************************************************`);
    cy.log(`****************************************************`);
    cy.log(`Delete 3 employees and job title and location i added in the beforeEach`);

    cy.get("@employeemohammad").then((empNumber) => {
      Employee.deleteEmp(empNumber);
    });
    cy.get("@employeeahmed").then((empNumber) => {
      Employee.deleteEmp(empNumber);
    });
    cy.get("@employeemahmoud").then((empNumber) => {
      Employee.deleteEmp(empNumber);
    });
    cy.get("@jobTitleId").then((jobTitleId) => {
      JobTitle.deleteJobTitle(jobTitleId);
    });
    cy.get("@locationId").then((locationId) => {
      Location.deleteLocation(locationId);
    });
  }
}
