const sizes: Cypress.ViewportPreset[] = ["iphone-6+", "macbook-16"];

describe("Mobile Profile Page Testing", () => {
  sizes.forEach((size) => {
    it(`${size}: Should have info after login`, () => {
      cy.viewport(size);
      cy.visit("/profile");

      if (size === "iphone-6+") {
        cy.get("[data-cy=nav-drawer-button]").click();
      }
      cy.get("[aria-label=sign-in]").click();
  
      cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
      cy.get("[type=password]").type("testing123");
      cy.get("[data-cy=login-button]").click();
  
      cy.wait(8000);
  
      // Profile Displays
      cy.get('[aria-label="Profile Picture"]').should('exist');
      cy.get('[aria-label="Display Name"]').should('exist');
  
      // Wallet 
      cy.get('[aria-label="Wallet Value"]').should("exist");
      cy.get('[aria-label="topup"]').should("exist");
  
      // Settings
      cy.get(`[aria-label="Change Profile"]`).should('exist');
      cy.get(`[aria-label="Change Password"]`).should('be.disabled');
      cy.get('[aria-label="Subscribe"]').should('exist');
    });

    it(`${size}: Should have no info after logout`, () => {
      cy.viewport(size);
      cy.visit("/profile");

      if (size === "iphone-6+") {
        cy.get("[data-cy=nav-drawer-button]").click();
      }
      cy.get("[aria-label=sign-in]").click();
  
      cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
      cy.get("[type=password]").type("testing123");
      cy.get("[data-cy=login-button]").click();
  
      cy.wait(8000);
  
      if (size === "iphone-6+") {
        cy.get("[data-cy=nav-drawer-button]").click();
      }
      cy.get("[aria-label=log-out]").click();
  
      cy.visit("/profile");
  
      // Profile Displays
      cy.get('[aria-label="Display Name"]').should('not.exist');
  
      // Wallet 
      cy.get('[aria-label="Wallet Value"]').should("not.exist");
      cy.get('[aria-label="topup"]').should("not.exist");
  
      // Settings
      cy.get(`[aria-label="Change Profile"]`).should('not.exist');
      cy.get(`[aria-label="Change Password"]`).should('not.exist');
      cy.get('[aria-label="Subscribe"]').should('not.exist');
    });
  })
});