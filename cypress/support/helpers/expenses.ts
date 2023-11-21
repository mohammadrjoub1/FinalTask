export class Expenses {
  static createExpenses(expenseName, expenseDiscription) {
    cy.api({
      method: "POST",
      url: "/api/v2/claim/expenses/types",
      body: {
        name: expenseName,
        description: expenseDiscription,
        status: true,
      },
    }).then((response) => {
      cy.wrap(response.body.data.id).as("expenseId");
    });
  }
  static deleteExpense(expenseId) {
      cy.api({
        method: "DELETE",
        url: "/api/v2/claim/expenses/types",
        body: {
          ids: [expenseId],
        },
      });
  }
}
