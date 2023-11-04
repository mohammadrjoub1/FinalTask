/// <reference types="cypress" />

import "cypress-file-upload";
import { AttachJobTitleAndlocationToEmp } from "./helpers/attachJobTitleAndlocationToEmp";
import { PreparingDataAssertion } from "./helpers/preparingDataAssertion";
const randomNumber = Math.floor(Math.random() * 100) + 1;

// commands.js or commands.ts

// cypress/support/commands.ts

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/auth/login");
  cy.get(":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input").type(username);
  cy.get(":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input").type(password);
  cy.get(".oxd-button").click();
});
Cypress.Commands.add("logOut", () => {
  cy.get(".oxd-userdropdown-tab > .oxd-icon").click();
  cy.get(":nth-child(4) > .oxd-userdropdown-link").click();
});
Cypress.Commands.add("createEmp", (firstName, middleName, lastName, empId, username, password) => {
  return cy
    .api({
      method: "POST",
      url: "/api/v2/pim/employees",
      body: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        empPicture: null,
        employeeId: empId,
      },
    })
    .then((response) => {
      cy.api({
        method: "POST",
        url: "/api/v2/admin/users",
        body: {
          username: username,
          password: password,
          status: true,
          userRoleId: 2,
          empNumber: response.body.data.empNumber,
        },
      })
        .then(() => {
          cy.api({
            method: "POST",
            url: `/api/v2/pim/employees/${response.body.data.empNumber}/salary-components`,
            body: {
              salaryComponent: "2",
              salaryAmount: "50000",
              payGradeId: 1,
              currencyId: "USD",
              payFrequencyId: "4",
              comment: null,
              addDirectDeposit: false,
            },
          });
        })
        .then(() => {
          // Alias the empNumber for later use
          cy.wrap(response.body.data.empNumber).as(`employee${firstName}`);
        });
    });
});
Cypress.Commands.add("attachJobTitleAndlocationToEmp", (jobId, locationId, empNumber) => {
  cy.api({
    method: "PUT",
    url: `/api/v2/pim/employees/${empNumber}/job-details`,
    body: {
      joinedDate: null,
      jobTitleId: jobId,
      locationId: locationId,
    },
  });
});

Cypress.Commands.add("deleteEmp", (empNumber) => {
  cy.api({
    method: "DELETE",
    url: "/api/v2/pim/employees",
    body: {
      ids: [empNumber],
    },
  });
});
Cypress.Commands.add("createLocation", (name, countryCode, province, city, address, zipCode, phone, fax, note) => {
  return cy
    .api({
      method: "POST",
      url: "/api/v2/admin/locations",
      body: {
        name: name,
        countryCode: countryCode,
        province: province,
        city: city,
        address: address,
        zipCode: zipCode,
        phone: phone,
        fax: fax,
        note: note,
      },
    })
    .then((response) => {
      // Alias the locationId for later use
      cy.wrap(response.body.data.id).as("locationId");
    });
});
Cypress.Commands.add("deleteLocation", (locationId) => {
  cy.api({
    method: "DELETE",
    url: "/api/v2/admin/locations",
    body: {
      ids: [locationId],
    },
  });
});
Cypress.Commands.add("createJobTitle", (title, description, note) => {
  return cy
    .api({
      method: "POST",
      url: "/api/v2/admin/job-titles",
      body: {
        title: title,
        description: description,
        specification: null,
        note: note,
      },
    })
    .then((response) => {
      // Alias the jobTitleId for later use
      cy.wrap(response.body.data.id).as("jobTitleId");
    });
});
Cypress.Commands.add("deleteJobTitle", (jobId) => {
  cy.api({
    method: "DELETE",
    url: "/api/v2/admin/job-titles",
    body: {
      ids: [jobId],
    },
  });
});

Cypress.Commands.add("prepareDataForPhaseOne", () => {
  //createLocation and save jobTitleId for later use
  cy.fixture("locationData").then((data) => {
    cy.createLocation(data.name, data.countryCode, data.province, data.city, data.address, data.zipCode, data.phone, data.fax, data.note).then((locId) => {
      // cy.deleteLocation(locId);
    });
  });

  //create jobTitle and save jobTitleId for later use
  cy.fixture("jobTitle").then((data) => {
    cy.createJobTitle(`${data.title}${randomNumber}`, data.description, data.note).then((jobId) => {
      // cy.deleteJobTitle(jobId);
    });
  });

  //create employee#1
  cy.fixture("empData1").then((data) => {
    cy.createEmp(data.firstName, data.middleName, data.lastName, data.employeeId, `${data.username}${randomNumber}`, data.password).then((empNumber) => {});
  });
  AttachJobTitleAndlocationToEmp.attachJobTitleAndlocationToEmp("mohammad");

  //create employee#2
  cy.fixture("empData2").then((data) => {
    cy.createEmp(data.firstName, data.middleName, data.lastName, data.employeeId, `${data.username}${randomNumber}`, data.password).then((empNumber) => {});
  });
  AttachJobTitleAndlocationToEmp.attachJobTitleAndlocationToEmp("ahmed");

  //create employee#3
  cy.fixture("empData3").then((data) => {
    cy.createEmp(data.firstName, data.middleName, data.lastName, data.employeeId, `${data.username}${randomNumber}`, data.password).then((empNumber) => {});
  });
  AttachJobTitleAndlocationToEmp.attachJobTitleAndlocationToEmp("mahmoud");

});

Cypress.Commands.add("deleteEmployee", (empNumber) => {
  cy.api({
    method: "DELETE",
    url: "/api/v2/pim/employees",
    body: {
      ids: [empNumber],
    },
  });
});
Cypress.Commands.add("deleteJobTitle", (jobId) => {
  cy.api({
    method: "DELETE",
    url: "/api/v2/admin/job-titles",
    body: {
      ids: [jobId],
    },
  });
});
Cypress.Commands.add("deleteLocation", (lcoationId) => {
  cy.api({
    method: "DELETE",
    url: "/api/v2/admin/locations",
    body: {
      ids: [lcoationId],
    },
  });
});
