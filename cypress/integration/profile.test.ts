describe("Mobile Profile Page Testing", () => {
  beforeEach(() => {
    cy.viewport("iphone-6+");
    cy.visit("/profile");
  });

  it("Should have info after login", () => {
    cy.get("[data-cy=nav-drawer-button]").click();
    cy.get("[aria-label=sign-in]").click();

    cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
    cy.get("[type=password]").type("testing123");
    cy.get("[data-cy=login-button]").click();

    cy.wait(8000);

    cy.get('[aria-label="Profile Picture"]');
    cy.get('[aria-label="Display Name"]');
    cy.get('[aria-label="Wallet Value"]');
    // cy.get('[aria-label="Edit Button"]').click();
  });

  it("Should have no info after logout", () => {
    cy.get("[data-cy=nav-drawer-button]").click();
    cy.get("[aria-label=sign-in]").click();

    cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
    cy.get("[type=password]").type("testing123");
    cy.get("[data-cy=login-button]").click();

    cy.wait(8000);

    cy.get("[data-cy=nav-drawer-button]").click();
    cy.get("[aria-label=log-out]").click();

    cy.visit("/profile");

    cy.get('[aria-label="Profile Picture"]');
    cy.get('[aria-label="Display Name"]').should("not.exist");
    cy.get('[aria-label="Wallet Value"]').should("not.exist");
    cy.get('[aria-label="Edit Button"]').should("not.exist");
  });
});

describe("Desktop Profile Page Testing", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/profile");
  });

  it("Should have info after login", () => {
    cy.get('[aria-label="sign-in"]').click();

    cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
    cy.get("[type=password]").type("testing123");
    cy.get("[data-cy=login-button]").click();

    cy.wait(8000);

    cy.get('[aria-label="Profile Picture"]');
    cy.get('[aria-label="Display Name"]');
    cy.get('[aria-label="Wallet Value"]');
  });

  it("Should have no info after logout", () => {
    cy.get('[aria-label="sign-in"]').click();

    cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
    cy.get("[type=password]").type("testing123");
    cy.get("[data-cy=login-button]").click();

    cy.wait(8000);

    cy.get('[aria-label="log-out"]').click();

    cy.visit("/profile");

    cy.get('[aria-label="Profile Picture"]');
    cy.get('[aria-label="Display Name"]').should("not.exist");
    cy.get('[aria-label="Wallet Value"]').should("not.exist");
    cy.get('[aria-label="Edit Button"]').should("not.exist");
  });
});
