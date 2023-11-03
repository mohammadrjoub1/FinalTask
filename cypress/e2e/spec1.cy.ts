import { faker } from "@faker-js/faker";
import { AttachJobTitleAndlocationToEmp } from "../support/helpers/attachJobTitleAndlocationToEmp";
import { Report } from "../support/helpers/report";
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
/*

PreRequisites :
Create 1 Location => go to admin =>organization =>locations: I DID IT VIA API
Create 1 Job Title>go to admin =>Job : I DID IT VIA API
Create 3 Employees and associate them with the created location and job title =>go to PIM: I DID IT VIA API
*/

describe("Senario #1", () => {
  beforeEach("senarion #1", () => {
    cy.fixture("adminLoginData").then((data) => {
      cy.login(data.username, data.password);
    });

    cy.prepareDataForPhaseOne();
  });
  it("TC #1", () => {
    cy.get("@jobTitleId").then((jobTitleId) => {
      cy.get("@locationId").then((locationId) => {
        Report.deleteAllReports();

        Report.createReport(jobTitleId, locationId);
      });
    });
    Report.reportUiAssertion();
  });
});
