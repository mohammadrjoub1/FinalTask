export class Claim {
  static createClaim(currencyId, remarks, date, amount, note) {
    cy.get("@eventId").then((eventId) => {
      cy.api({
        method: "POST",
        url: "/api/v2/claim/requests",
        body: {
          claimEventId: eventId,
          currencyId: currencyId,
          remarks: remarks,
        },
      }).then((response) => {
        cy.get("@expenseId").then((expenseId) => {
          cy.api({
            method: "POST",
            url: `api/v2/claim/requests/${response.body.data.id}/expenses`,
            body: {
              expenseTypeId: expenseId,
              date: "2023-11-08",
              amount: "50000.00",
              note: null,
            },
          }).then(() => {
            cy.api({
              method: "PUT",
              url: `/api/v2/claim/requests/${response.body.data.id}/action`,
              body: {
                action: "SUBMIT",
              },
            });
          });
        });
      });
    });
  }
}

// {
//   expenseTypeId: expenseId,
//   date: date,
//   amount: amount,
//   note: note,
// }
