export const test_shortcut = (label: string) => {
  cy.get(`[aria-label=${label}]`).should("exist").should("be.visible").click();
  cy.url().should("include", `/explore?keyword=${label}`);
};

export const test_logo = () => {
  cy.get("[data-cy=logo]").should("be.visible");
};

export const test_search_bar = () => {
  cy.get("[data-cy=search-input]")
    .invoke("attr", "placeholder")
    .should("contain", "Search...");

  cy.get("[data-cy=search-button]").should("exist");
};

export const test_carousel = () => {
  cy.get("[aria-label=carousel]").should("exist");
};
