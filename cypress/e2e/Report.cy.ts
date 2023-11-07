import { faker } from "@faker-js/faker";
import { Report } from "../support/helpers/report";
import { Delete } from "../support/helpers/delete";
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Senario #1", () => {
  beforeEach("senarion #1", () => {
    cy.fixture("adminLoginData").then((data) => {
      cy.login(data.username, data.password);
    });

    cy.prepareDataForPhaseOne();
  });
  afterEach("", () => {
    Delete.deleteEverything();
  });
  it("creating an Employee Report and make assertion for the report data ", () => {
    Report.deleteAllReports();

    cy.get("@jobTitleId").then((jobTitleId) => {
      cy.get("@locationId").then((locationId) => {
        Report.createReportApi(jobTitleId, locationId);
      });
    });

    Report.reportUiAssertion();
  });
});
