// cypress/support/commands.d.ts

declare namespace Cypress {
  interface Chainable {
    login(username, password);
    logOut();
    createEmp(firstName, middleName, lastName, empId, username, password);
    deleteEmp(empNumber);
    createLocation(name, countryCode, province, city, address, zipCode, phone, fax, note);
    deleteLocation(locationId);
    createJobTitle(title, description, note);
    deleteJobTitle(jobId);
    attachJobTitleAndlocationToEmp(jobId, locationId, empNumber);
    prepareDataForPhaseOne();
  }
}
