export class Location {
  static createLocation(name, countryCode, province, city, address, zipCode, phone, fax, note) {
    cy.api({
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
    }).then((response) => {
      // Alias the locationId for later use
      cy.wrap(response.body.data.id).as("locationId");
    });
  }


  static deleteLocation(locationId) {
    cy.api({
      method: "DELETE",
      url: "/api/v2/admin/locations",
      body: {
        ids: [locationId],
      },
    });
  }

}
