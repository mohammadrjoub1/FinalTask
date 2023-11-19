export class JobTitle {
  static createJobTitle(title, description, note) {
    cy.api({
      method: "POST",
      url: "/api/v2/admin/job-titles",
      body: {
        title: title,
        description: description,
        specification: null,
        note: note,
      },
    }).then((response) => {
      // Alias the jobTitleId for later use
      cy.wrap(response.body.data.id).as("jobTitleId");
    });
  }
  static deleteJobTitle(jobId) {
    cy.api({
      method: "DELETE",
      url: "/api/v2/admin/job-titles",
      body: {
        ids: [jobId],
      },
    });
  }
}
