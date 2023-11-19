export class Employee {
  static createEmployee(firstName, middleName, lastName, empId, username, password) {
    cy.api({
      method: "POST",
      url: "/api/v2/pim/employees",
      body: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        empPicture: null,
        employeeId: empId,
      },
    }).then((response) => {
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
  }
  static attachJobTitleAndlocationToEmp(jobId, locationId, empNumber) {
    cy.api({
      method: "PUT",
      url: `/api/v2/pim/employees/${empNumber}/job-details`,
      body: {
        joinedDate: null,
        jobTitleId: jobId,
        locationId: locationId,
      },
    });
  }
  static deleteEmp(empNumber) {
    cy.api({
      method: "DELETE",
      url: "/api/v2/pim/employees",
      body: {
        ids: [empNumber],
      },
    });
  }
  
}
