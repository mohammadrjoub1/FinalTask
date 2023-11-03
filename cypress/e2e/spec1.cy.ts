import { faker } from "@faker-js/faker";
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
/*

PreRequisites :
Create 1 Location => go to admin =>organization =>locations:

   
    cy.fixture("locationData").then((data) => {
      cy.createLocation(data.name, data.countryCode, data.province, data.city, data.address, data.zipCode, data.phone, data.fax, data.note).then((locationId) => {
        cy.log(locationId);
        cy.deleteLocation(locationId);
      });
    });



Create 1 Job Title>go to admin =>Job :

    cy.fixture("jobTitle").then((data) => {
      cy.createJobTitle(data.title, data.description, data.note).then((jobTitleId) => {
        cy.deleteJobTitle(jobTitleId);
      });
    });



Create 3 Employees and associate them with the created location and job title =>go to PIM:

    cy.fixture("empData").then((data) => {
      cy.createEmp(data.firstName, data.middleName, data.lastName, data.employeeId, data.username, data.password).then((empNumber) => {
        cy.log(empNumber);

        employeeNumber = empNumber;
        cy.log(employeeNumber);

        cy.deleteEmp(empNumber);
      });
    });
   
    // alias to retrieve the employeeNumber
    cy.get("@employeeNumber").then((empNumber) => {
      employeeNumber = empNumber;
      cy.log(employeeNumber);
    });
*/

/* 
Steps :
*/
let employeeNumber;
let jobTitleId;
let locationId;
describe("Senario #1", () => {
  beforeEach("senarion #1", () => {
    cy.fixture("adminLoginData").then((data) => {
      cy.login(data.username, data.password);
    });
  });

  it("TC #1", () => {
    //createLocation and save jobTitleId for later use
    cy.fixture("locationData").then((data) => {
      cy.createLocation(data.name, data.countryCode, data.province, data.city, data.address, data.zipCode, data.phone, data.fax, data.note).then((locationId) => {
        cy.deleteLocation(locationId);
      });
    });

    //create jobTitle and save jobTitleId for later use
    cy.fixture("jobTitle").then((data) => {
      cy.createJobTitle(data.title, data.description, data.note).then((jobTitleId) => {
        cy.deleteJobTitle(jobTitleId);
      });
    });

    //create 3 emplyees with jobTitleId and locationId as we agreed on  and save jobTitleId for later use
    cy.fixture("empData").then((data) => {
      cy.createEmp(data.firstName, data.middleName, data.lastName, data.employeeId, data.username, data.password).then((empNumber) => {
        cy.deleteEmp(empNumber);
      });
    });
    // cy.attachJobTitleAndlocationToEmp(jobTitleId, locationId, employeeNumber);
  });
});
