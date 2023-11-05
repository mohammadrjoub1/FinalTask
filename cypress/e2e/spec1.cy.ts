import { faker } from "@faker-js/faker";
import { Events } from "../support/helpers/events";
import { DeleteData } from "../support/helpers/deleteData";
import { Expenses } from "../support/helpers/expenses";
import { Employee } from "../support/helpers/Employee";
import { Claim } from "../support/helpers/claim";

describe("Senario #1", () => {
  beforeEach("senarion #1", () => {
    cy.logIn("Admin", "admin123");
  });

  it.only("Admin should be able to submit(Pay) a claim", () => {
    cy.fixture("event").then((data) => {
      Events.createEvent(data.name, data.description);
    });
    cy.fixture("expenses").then((data) => {
      Expenses.createExpenses(data.name, data.description);
    });
    cy.fixture("employee").then((data) => {
      Employee.createEmployee(data.firstName, data.middleName, data.lastName, data.empId, data.username, data.password);
      cy.logOut();
      cy.logIn(data.username, data.password);
    });
    cy.fixture("claimDetails").then((data) => {
      Claim.createClaim(data.currencyId, data.remarks, data.date, data.amount, data.note);
    });
    
    // cy.logOut();
    // cy.logIn("Admin", "admin123");

    // DeleteData.deleteAll();
  });
  it("Admin should be able to unaccepted  a claim", () => {});
});
