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
      }).then(() => {
        // Alias the empNumber for later use
        cy.wrap(response.body.data.empNumber).as(`empNumber`);
      });
    });
  }
  static deleteEmployee(empNumber) {
    cy.api({
      method: "DELETE",
      url: "/api/v2/pim/employees",
      body: {
        ids: [empNumber],
      },
    });
  }
}
