describe("Sign In Testing", () => {
  beforeEach(() => {
    cy.viewport("iphone-6+");
    cy.visit("/home");
    cy.get("[data-cy=nav-drawer-button]").click();
    cy.get("[aria-label=sign-in]").click();
  });

  it("Should login with correct Email and Password", () => {
    cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
    cy.get("[type=password]").type("testing123");
    cy.get("[data-cy=login-button]").click();

    // Terrible solution...
    cy.wait(8000);

    cy.url().should("include", "/home");
    cy.get("[data-cy=nav-drawer-button]")
      .click()
      .get("[aria-label=sign-in]")
      .should("not.exist")
      .get("[aria-label=log-out]")
      .should("exist");
  });

  it("Should alert when wrong password", () => {
    cy.get("[type=email]").type("amadeus.winarto@u.nus.edu");
    cy.get("[type=password]").type("testing12");
    cy.get("[data-cy=login-button]").click();

    // Terrible solution...
    cy.wait(2000);

    cy.get("[data-cy=error]")
      .should("exist")
      .contains("Incorrect password provided");
  });

  it("Should alert when not NUS Email", () => {
    cy.get("[type=email]").type("amadeus.winarto@gmail.com");
    cy.get("[type=password]").type("testing12");
    cy.get("[data-cy=login-button]").click();

    // Terrible solution...
    cy.wait(2000);

    cy.get("[data-cy=error]")
      .should("exist")
      .contains("Please input an NUS email");
  });

  it("Should navigate to forget password", () => {
    cy.get("[aria-label=forgot]").click();
    cy.get("[aria-label=request_pwd_modal]").should("exist");
  });

  it("Should navigate to sign up", () => {
    cy.get("[aria-label=create]").click();
    cy.get("[aria-label=sign-up-modal]").should("exist");
  });
});
