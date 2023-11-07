/// <reference types="cypress" />

import "cypress-file-upload";
import { AttachJobTitleAndlocationToEmp } from "./helpers/attachJobTitleAndlocationToEmp";
import { Employee } from "./helpers/employee";
import { JobTitle } from "./helpers/jobTitle";
import { Location } from "./helpers/location";
const randomNumber = Math.floor(Math.random() * 100) + 1;

// commands.js or commands.ts

// cypress/support/commands.ts

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/auth/login");
  cy.get('[placeholder="Username"]').type(username);
  cy.get('[placeholder="Password"]').type(password);
  cy.get('[type="submit"]').click();
});
Cypress.Commands.add("logOut", () => {
  cy.get(".oxd-userdropdown-tab > .oxd-icon").click();
  cy.get(":nth-child(4) > .oxd-userdropdown-link").click();
});

Cypress.Commands.add("prepareDataForPhaseOne", () => {
  //createLocation and save jobTitleId for later use
  cy.fixture("locationData").then((data) => {
    Location.createLocation(data.name, data.countryCode, data.province, data.city, data.address, data.zipCode, data.phone, data.fax, data.note);
  });

  //create jobTitle and save jobTitleId for later use
  cy.fixture("jobTitle").then((data) => {
    JobTitle.createJobTitle(`${data.title}${randomNumber}`, data.description, data.note);
  });

  //create employee#1
  cy.fixture("empData1").then((data) => {
    Employee.createEmployee(data.firstName, data.middleName, data.lastName, data.employeeId, `${data.username}${randomNumber}`, data.password);
  });
  AttachJobTitleAndlocationToEmp.attachJobTitleAndlocationToEmp("mohammad");

  //create employee#2
  cy.fixture("empData2").then((data) => {
    Employee.createEmployee(data.firstName, data.middleName, data.lastName, data.employeeId, `${data.username}${randomNumber}`, data.password);
  });
  AttachJobTitleAndlocationToEmp.attachJobTitleAndlocationToEmp("ahmed");

  //create employee#3
  cy.fixture("empData3").then((data) => {
    Employee.createEmployee(data.firstName, data.middleName, data.lastName, data.employeeId, `${data.username}${randomNumber}`, data.password);
  });
  AttachJobTitleAndlocationToEmp.attachJobTitleAndlocationToEmp("mahmoud");
});
