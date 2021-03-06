import {
  test_carousel,
  test_logo,
  test_search_bar,
  test_shortcut,
} from "cypress/integration/commonTests";

describe("Mobile Home Page Rendering", () => {
  beforeEach(() => {
    cy.viewport("iphone-6+");
    cy.visit("/home");
  });

  it("Should have logo", () => {
    test_logo();
  });

  it("Should have search bar", () => {
    test_search_bar();
  });

  it("Should have carousel", () => {
    test_carousel();
  });

  it("Should not have navigation links", () => {
    cy.get("[aria-label=home]").should("not.exist");
    cy.get("[aria-label=explore]").should("not.exist");
    cy.get("[aria-label=profile]").should("not.exist");
    cy.get("[aria-label=sign-in]").should("not.exist");
  });

  it("Should have navbar buttons", () => {
    cy.get("[aria-label=Home]").should("exist");
    cy.get("[aria-label=Explore]").should("exist");
    cy.get(`[aria-label="My Booking"]`).should("exist");
    cy.get("[aria-label=Profile]").should("exist");
  });

  it("Should have navigation drawer", () => {
    cy.get("[data-cy=nav-drawer-button]").click();
    cy.get("[aria-label=sign-up]").get("[aria-label=sign-in]");
  });

  it("Should have sport shortcut", () => {
    test_shortcut("sport");
  });

  it("Should have meeting shortcut", () => {
    test_shortcut("meeting");
  });

  it("Should have study shortcut", () => {
    test_shortcut("study");
  });
});

describe("Desktop Home Page Rendering", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/home");
  });

  it("Should have logo", () => {
    test_logo();
  });

  it("Should have search bar", () => {
    test_search_bar();
  });

  it("Should have carousel", () => {
    test_carousel();
  });

  it("Should have navigation buttons", () => {
    cy.get("[aria-label=home]").should("exist");
    cy.get("[aria-label=explore]").should("exist");
    cy.get("[aria-label=profile]").should("exist");
    cy.get("[aria-label=sign-in]").should("exist");
  });

  it("Should not have navbar buttons", () => {
    cy.get("[aria-label=Home]").should("not.exist");
    cy.get("[aria-label=Explore]").should("not.exist");
    cy.get(`[aria-label="My Booking"]`).should("not.exist");
    cy.get("[aria-label=Profile]").should("not.exist");
  });

  it("Should not have navigation drawer", () => {
    cy.get("[data-cy=nav-drawer-button]").should("not.exist");
  });

  it("Should have sport shortcut", () => {
    test_shortcut("sport");
  });

  it("Should have meeting shortcut", () => {
    test_shortcut("meeting");
  });

  it("Should have study shortcut", () => {
    test_shortcut("study");
  });
});
