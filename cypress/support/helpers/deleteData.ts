import { Employee } from "./Employee";
import { Events } from "./events";
import { Expenses } from "./expenses";

export class DeleteData {
  static deleteAll() {
    cy.get("@empNumber").then((empNumber) => {
      Employee.deleteEmployee(empNumber);
    });

    cy.get("@eventId").then((eventId) => {
      Events.DeleteEvent(eventId);
    });
    cy.get("@expenseId").then((expenseId) => {
      Expenses.deleteExpense(expenseId);
    });
  }
}
