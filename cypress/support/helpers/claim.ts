export class Claim {
  static submitClaim(currencyId, remarks, amount, note) {
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
  static approveClaimUi() {
    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const parts = date.split("-");
    const finalDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    cy.logOut();
    cy.logIn("Admin", "admin123");

    cy.get(".oxd-navbar-nav").contains("span", "Claim").click();
    cy.get('[role="table"]').contains("div", "mohammad rjoub").parent().parent().parent().contains('[type="button"]', " View Details ").click();
    cy.get(".oxd-button--secondary").click();
  }
  static rejectClaimUi() {
    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const parts = date.split("-");
    const finalDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    cy.logOut();
    cy.logIn("Admin", "admin123");

    cy.get(".oxd-navbar-nav").contains("span", "Claim").click();
    cy.get('[role="table"]').contains("div", "mohammad rjoub").parent().parent().parent().contains('[type="button"]', " View Details ").click();
    cy.get(".oxd-button--danger").click();
  }

  static claimAssertion(status, finalDate, amount) {
    cy.log(finalDate);
    cy.get(".oxd-navbar-nav").contains("span", "Claim").click();

    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(10).should("contain", `${finalDate}`);
    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(12).should("contain", status);
    cy.get(".oxd-table-body").contains("div", "mohammad rjoub").parent().parent().find("div").eq(14).should("contain", amount);
  }
}
