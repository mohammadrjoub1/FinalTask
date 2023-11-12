export class Claim {
  static createClaim(currencyId, remarks, amount, note) {
    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

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
              date: date,
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
  static approveClaimApi() {
    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

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
    Claim.claimAssertion("Paid", date);
  }
  static approveClaimUi() {
    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    cy.logOut();
    cy.logIn("Admin", "admin123");

    cy.get(".oxd-navbar-nav").contains("span", "Claim").click();
    cy.get('[role="table"]').contains("div", "mohammad rjoub").parent().parent().parent().contains('[type="button"]', " View Details ").click();
    cy.get(".oxd-button--secondary").click();
    Claim.claimAssertion("Paid", date);
  }
  static cancelClaimUi() {
    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    cy.logOut();
    cy.logIn("Admin", "admin123");

    cy.get(".oxd-navbar-nav").contains("span", "Claim").click();
    cy.get('[role="table"]').contains("div", "mohammad rjoub").parent().parent().parent().contains('[type="button"]', " View Details ").click();
    cy.get(".oxd-button--danger").click();
    Claim.claimAssertion("Rejected", date);
  }

  static cancelClaimApi() {
    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

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
    Claim.claimAssertion("Rejected", date);
  }

  static claimAssertion(status, date) {
    cy.get(":nth-child(11) > .oxd-main-menu-item > .oxd-text").click();

    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(10).should("contain", date);
    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(12).should("contain", status);
    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(14).should("contain", "50,000.00");
  }
}
