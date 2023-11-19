export class AttachJobTitleAndlocationToEmp {
  static attachJobTitleAndlocationToEmp(name) {
    cy.get(`@employee${name}`).then((employeeNumber) => {
      cy.get("@locationId").then((locationId) => {
        cy.get("@jobTitleId").then((jobTitleId) => {
          cy.log(`emplyee is id :${employeeNumber}`);
          cy.log(` location id is:${locationId}`);
          cy.log(` jobTitle id is:${jobTitleId}`);

          AttachJobTitleAndlocationToEmp.attachJobTitleAndlocationToEmp2(jobTitleId, locationId, employeeNumber);
        });
      });
    });
  }
  static attachJobTitleAndlocationToEmp2(jobId, locationId, empNumber) {
    cy.api({
      method: "PUT",
      url: `/api/v2/pim/employees/${empNumber}/job-details`,
      body: {
        joinedDate: null,
        jobTitleId: jobId,
        locationId: locationId,
      },
    });
  }
}
