import { faker } from "@faker-js/faker";
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
/*

Given :
Create 1 Location => go to admin =>organization =>locations:
    cy.createLocation("freepalestine", "PS", "westbank", "nablus", "", "0599", "0599654256", "0599654256", "gfdg").then((locationId) => {
      cy.log(locationId);
      cy.deleteLocation(locationId);
    });

Create 1 Job Title>go to admin =>Job :

Create 3 Employees and associate them with the created location and job title =>go to PIM:
    cy.createEmp("mohamamd", "jamal", "rjoub", "0599", "mohammad", "mohammad123").then((empNumber) => {
      cy.log(empNumber);
      cy.deleteEmp(empNumber);
    });


*/

describe("Senario #1", () => {
  beforeEach("senarion #1", () => {
    cy.fixture("adminLoginData").then((data) => {
      cy.login(data.username, data.password);
    });
  });

  it("TC #1", () => {

    cy.createJobTitle("okodk","odkok","oksok").then((jobTitleId) => {
    // cy.deleteJobTitle(jobTitleId);

    });

  });
});
