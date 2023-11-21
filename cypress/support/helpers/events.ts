export class Events {
  static createEvent(nameOfEvent: string, eventDescription: string) {
    cy.api({
      method: "POST",
      url: "/api/v2/claim/events",
      body: {
        name: nameOfEvent,
        description: eventDescription,
        status: true,
      },
    }).then((response) => {
      cy.wrap(response.body.data.id).as("eventId");
    });
  }
  static DeleteEvent(id) {
      cy.api({
        method: "DELETE",
        url: "/api/v2/claim/events",
        body: {
          ids: [id],
        },
      });
  }
}
