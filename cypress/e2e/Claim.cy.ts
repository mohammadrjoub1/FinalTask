import { faker } from "@faker-js/faker";
import { Events } from "../support/helpers/events";
import { Expenses } from "../support/helpers/expenses";
import { Employee } from "../support/helpers/Employee";
import { Claim } from "../support/helpers/claim";

describe("Senario #1", () => {
  var today = new Date();
  var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // const parts = date.split("-");
  // var finalDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  beforeEach("", () => {
    cy.logIn("Admin", "admin123");
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
      Claim.submitClaim(data.currencyId, data.remarks, data.date, data.amount);
    });
  });
  afterEach("", () => {
    cy.get("@empNumber").then((empNumber) => {
      Employee.deleteEmployee(empNumber);
    });

    cy.get("@eventId").then((eventId) => {
      Events.DeleteEvent(eventId);
    });
    cy.get("@expenseId").then((expenseId) => {
      Expenses.deleteExpense(expenseId);
    });
  });
  it("Admin should be able to APPROVE (Pay) a claim via UI", () => {
    Claim.approveClaimUi();
    Claim.claimAssertion("Paid", date, "50,000.00");
  });
  it("Admin should be able to Reject a claim via UI", () => {
    cy.log(date);

    Claim.rejectClaimUi();
    Claim.claimAssertion("Rejected", date, "50,000.00");
  });
});
