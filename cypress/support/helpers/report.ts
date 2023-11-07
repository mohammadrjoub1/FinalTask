export class Report {
  static createReportApi(jobTitleId, locationId) {
    //deletePreviousReports
    cy.api({
      method: "POST",
      url: "/api/v2/pim/reports/defined",
      body: {
        name: "RjoubReport", //report name
        include: "onlyCurrent",
        criteria: {
          "14": {
            //job Criteria
            operator: "eq",
            x: `${jobTitleId}`, //jobTitleId
            y: "undefined",
          },
          "20": {
            //location Criteria
            operator: "in",
            x: `${locationId}`, //locationId
            y: "undefined",
          },
        },
        fieldGroup: {
          //Display Fields

          "1": {
            fields: [11],
            includeHeader: false,
          },
          "6": {
            fields: [77],
            includeHeader: false,
          },
          "7": {
            fields: [67],
            includeHeader: false,
          },
        },
      },
    });
  }
  static reportUiAssertion() {
    //below code is for navigating the report
    cy.get(":nth-child(2) > .oxd-main-menu-item").click();
    cy.get(":nth-child(4) > .oxd-topbar-body-nav-tab-item").click();

    cy.get(':nth-child(1) > .oxd-table-row > [style="flex: 1 1 15%;"] > .oxd-table-cell-actions > :nth-child(3) > .oxd-icon').click();
    //Report Name Assertion
    cy.get(".orangehrm-card-container > .oxd-text").should("contain", "RjoubReport");

    //header Assertion for the three Headers
    cy.get('[data-rgcol="0"] > .header-content').should("contain", "Employee First Name");
    cy.get('[data-rgcol="1"] > .header-content').should("contain", "Job Title");
    cy.get('[data-rgcol="2"] > .header-content').should("contain", "Amount");

    //cells Assertion
    cy.get('[style="height: 32px; transform: translateY(0px);"] > [data-rgcol="0"]').should("contain", "mohammad");
    cy.get('[style="height: 32px; transform: translateY(32px);"] > [data-rgcol="0"]').should("contain", "ahmed");
    cy.get('[style="height: 32px; transform: translateY(64px);"] > [data-rgcol="0"]').should("contain", "mahmoud");
    cy.get("#app revogr-overlay-selection revogr-data div:nth-child(1) div:nth-child(2)").should("contain", "Violin Player");
    cy.get("#app revogr-overlay-selection revogr-data div:nth-child(2) div:nth-child(2)").should("contain", "Violin Player");
    cy.get("#app revogr-overlay-selection revogr-data div:nth-child(3) div:nth-child(2)").should("contain", "Violin Player");
    cy.get('[style="height: 32px; transform: translateY(0px);"] > [data-rgcol="2"] > span > ul > :nth-child(1)').should("contain", "50000");
    cy.get('[style="height: 32px; transform: translateY(32px);"] > [data-rgcol="2"] > span > ul > :nth-child(1)').should("contain", "50000");
    cy.get('[style="height: 32px; transform: translateY(64px);"] > [data-rgcol="2"] > span > ul > :nth-child(1)').should("contain", "50000");

    //quantitiy of rows
    cy.get("#app revogr-overlay-selection revogr-data").children().should("have.length", 3);
  }

  static deleteAllReports() {
    cy.get(":nth-child(2) > .oxd-main-menu-item").click();
    cy.get(":nth-child(4) > .oxd-topbar-body-nav-tab-item").click();

    cy.get(".orangehrm-horizontal-padding")
      .invoke("text")
      .then((text) => {
        if (text.includes("No Records Found")) {
          cy.log("no need to delete");
        } else {
          cy.get(".oxd-table-row > :nth-child(1) > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon").click({ force: true });
          cy.get(".orangehrm-horizontal-padding > div > .oxd-button").click({ force: true });
          cy.get(".orangehrm-modal-footer > .oxd-button--label-danger").click({ force: true });
        }
      });
  }
  static createReportUi(reportName, jobTitle, location) {
    cy.fixture("report").then((data) => {
      cy.get(".oxd-navbar-nav").contains("span", "PIM").click();
      cy.get(`[role="navigation"]`).contains("li", "Reports").click();
      cy.get(`.orangehrm-paper-container`).contains("button", "Add").click();
      cy.get(`[placeholder="Type here ..."]`).type(data.reportName);

      //Selection Criteria-Job Title
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().contains("div", "-- Select --").click();
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().contains("div", "-- Select --").parent().parent().contains("div", "Job Title").click();
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().find("button").click();
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().find(".orangehrm-full-width-grid").find(":nth-child(4)").click();
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().contains("span", `${jobTitle}`).click();

      //Selection Criteria-Location
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().contains("div", "-- Select --").click();
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().contains("div", "-- Select --").parent().parent().contains("div", "Location").click();
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().find(".orangehrm-report-icon").click();
      cy.get(":nth-child(6) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input").click();
      cy.get(`.oxd-form`).contains("h6", "Selection Criteria").parent().contains('[role="option"]', `${location}`).click();

      //Display Fields -Personal
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains("div", "-- Select --").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains("div", "-- Select --").parent().parent().contains("div", "Personal").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().find("div").find(".orangehrm-report-criteria").contains("div", "-- Select --").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains('[role="option"]', "Employee First Name").click();
      cy.get(":nth-child(5) > .oxd-grid-4 > .orangehrm-report-criteria > :nth-child(2) > :nth-child(2) > .oxd-icon-button > .oxd-icon").click();

      //Display Fields -JobTitle
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains("div", "Personal").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains("div", "-- Select --").parent().parent().contains("div", "Job").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().find("div").find(".orangehrm-report-criteria").contains("div", "-- Select --").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains('[role="option"]', "Job Title").click();
      cy.get(":nth-child(5) > .oxd-grid-4 > .orangehrm-report-criteria > :nth-child(2) > :nth-child(2) > .oxd-icon-button > .oxd-icon").click();

      //Display Fields -SalaryJob Title
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains("div", "Job").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains("div", "-- Select --").parent().parent().contains("div", "Salary").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().find("div").find(".orangehrm-report-criteria").contains("div", "-- Select --").click();
      cy.get(`.oxd-form`).contains("h6", "Display Fields").parent().contains('[role="option"]', "Amount").click();
      cy.get(":nth-child(5) > .oxd-grid-4 > .orangehrm-report-criteria > :nth-child(2) > :nth-child(2) > .oxd-icon-button > .oxd-icon").click();

      //click save button
      cy.get(".oxd-button--secondary").click();
    });
  }
}
//change QA Leader to Violin Player
//change home to gazaskygeeks
