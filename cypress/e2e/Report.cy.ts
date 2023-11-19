import { faker } from "@faker-js/faker";
import { Report } from "../support/helpers/report";
import { Employee } from "../support/helpers/employee";
import { JobTitle } from "../support/helpers/jobTitle";
import { Location } from "../support/helpers/location";
// Cypress.on("uncaught:exception", (err, runnable) => {
//   return false;
// });

describe("Creating an Employee", () => {
  beforeEach("senarion #1", () => {
    cy.fixture("adminLoginData").then((data) => {
      cy.login(data.username, data.password);
    });

    cy.createThreeEmployeesAndLocationAndJobTitle();
  });
  afterEach("", () => {
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
  });
  it("creating an  Employee Report and make assertion for the report data Via API", () => {
    Report.deleteAllReports();

    cy.get("@jobTitleId").then((jobTitleId) => {
      cy.get("@locationId").then((locationId) => {
        Report.createReportApi(jobTitleId, locationId);
      });
    });

    Report.reportAssertions();
  });
  it("creating an Employee Report and make assertion for the report data Via UI", () => {
    Report.deleteAllReports();
    cy.fixture("report").then((data) => {
      Report.createReportUi(data.reportName, data.jobTitle, data.location);
    });

    Report.reportAssertions();
  });
});
