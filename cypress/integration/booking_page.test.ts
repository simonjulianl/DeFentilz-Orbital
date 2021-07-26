const sizes: Cypress.ViewportPreset[] = ["iphone-6+", "macbook-16"];

describe("Booking Page", () => {
  sizes.forEach((size) => {
    it(`Cannot book before login on ${size}`, () => {
      cy.viewport(size);
      cy.visit("/explore");

      cy.get("[data-cy=search-card]")
        .first()
        .click()
        .get("[data-cy=search-card-modal]")
        .get("[data-cy=sign-in]")
        .should("be.disabled");
    });

    it(`Functional booking page after login on ${size}`, () => {
      cy.viewport(size);
      cy.visit("/explore");

      if (size === "iphone-6+") {
        cy.get("[data-cy=nav-drawer-button]").click();
        cy.get("[aria-label=sign-in]").click();
      } else {
        cy.get('[aria-label="sign-in"]').click();
      }
      cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
      cy.get("[type=password]").type("testing123");
      cy.get("[data-cy=login-button]").click();

      cy.get("[data-cy=search-card]")
        .first() // Try only on the first one
        .click()
        .get("[data-cy=search-card-modal]")
        .get("[data-cy=sign-in]")
        .click();

      cy.wait(3000);

      cy.get('[aria-label="Facility Name"]');
      cy.get('[aria-label="Facility Image"]');
      cy.get('[aria-label="Price"]');
      cy.get('[aria-label="Location"]');
      cy.get('[aria-label="Rating"]');

      cy.get('[aria-label="Booking Calendar"]').scrollIntoView();

      cy.contains("Day").click();
      cy.contains("Month").click();
      cy.contains("3 Day").click();

      if (size === "macbook-16") {
        cy.contains("Week").click();
      }

      cy.get("[aria-label=Back]").click();
      cy.get("[aria-label=Next]").click();
      cy.get("[aria-label=Today]").click();
    });
  });
});
