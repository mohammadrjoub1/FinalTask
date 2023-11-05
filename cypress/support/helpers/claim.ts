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
          })
            .then(() => {
              cy.wrap(response.body.data.id).as(`calimId`);
            })
            .then(() => {
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
  static approveClaim() {
    cy.get("@calimId").then((calimId) => {
      cy.logOut();
      cy.logIn("Admin", "admin123");
      cy.api({
        method: "PUT",
        url: `/api/v2/claim/requests/${calimId}/action`,
        body: {
          action: "APPROVE",
        },
      });
    });
    Claim.claimAssertion("Paid");
  }
  static cancelClaim() {
    cy.get("@calimId").then((calimId) => {
      cy.logOut();
      cy.logIn("Admin", "admin123");
      cy.api({
        method: "PUT",
        url: `/api/v2/claim/requests/${calimId}/action`,
        body: {
          action: "REJECT",
        },
      });
    });
     Claim.claimAssertion("Rejected");
  }

  static claimAssertion(status) {
    cy.get(":nth-child(11) > .oxd-main-menu-item > .oxd-text").click();

    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(10).should("contain", "2023-11-05");
    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(12).should("contain", status);
    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(14).should("contain", "50,000.00");
  }
}
