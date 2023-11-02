/// <reference types="cypress" />

import "cypress-file-upload";

// commands.js or commands.ts

// cypress/support/commands.ts

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/auth/login");
  //   cy.wait(5000);
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
    .request({
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
      cy.request({
        method: "POST",
        url: "/api/v2/admin/users",
        body: {
          username: username,
          password: password,
          status: true,
          userRoleId: 2,
          empNumber: response.body.data.empNumber,
        },
      }).then(() => {
        return response.body.data.empNumber;
      });
    });
});
Cypress.Commands.add("deleteEmp", (empNumber) => {
  cy.request({
    method: "DELETE",
    url: "/api/v2/pim/employees",
    body: {
      ids: [empNumber],
    },
  });
});
Cypress.Commands.add("createLocation", (name, countryCode, province, city, address, zipCode, phone, fax, note) => {
  return cy
    .request({
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
      return response.body.data.id;
    });
});
Cypress.Commands.add("deleteLocation", (locationId) => {
  cy.request({
    method: "DELETE",
    url: "/api/v2/admin/locations",
    body: {
      ids: [locationId],
    },
  });
});
Cypress.Commands.add("createJobTitle", (title, description, note) => {
  return cy
    .request({
      method: "POST",
      url: "/api/v2/admin/job-titles",
      body: {
        title: title,
        description: description,
        specification: null,
        note: note,
      },
    })
    .then((respone) => {
      return respone.body.data.id;
    });
});
Cypress.Commands.add("deleteJobTitle", (jobId) => {
  cy.request({
    method: "DELETE",
    url: "/api/v2/admin/job-titles",
    body: {
      ids: [jobId],
    },
  });
});
