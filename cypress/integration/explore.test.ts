import { test_logo, test_search_bar } from 'cypress/integration/commonTests';

describe('Mobile Explore Page Rendering', () => {
    beforeEach(() => {
        cy.viewport('iphone-6+');
        cy.visit('/explore');
    })

    it('Should have logo', () => {
        test_logo();
    })

    it('Should have search bar', () => {
        test_search_bar();
    })

    it('Should have navigation drawer', () => {
        cy.get('[data-cy=nav-drawer-button]').click();
        cy.get('[aria-label=sign-up]')
            .get('[aria-label=sign-in]')
    })

    it('Should have search card (before sign in)', () => {
        cy.get('[data-cy=search-card]')
        .first() // Try only on the first one
        .click()
        .get('[data-cy=search-card-modal]')
        .get('[data-cy=sign-in]')
        .should('be.disabled');
    })

    it('Should have working search card', () => {
        cy.get('[data-cy=nav-drawer-button]').click();
        cy.get('[aria-label=sign-in]').click();
        cy.get('[type=email]').type('amadeus.winarto@u.nus.edu');
        cy.get('[type=password]').type('testing123');
        cy.get('[data-cy=login-button]').click();

        cy.get('[data-cy=search-card]')
        .first() // Try only on the first one
        .click()
        .get('[data-cy=search-card-modal]')
        .get('[data-cy=sign-in]').contains('Book Now!');
    })
})
  
  describe('Desktop Explore Page Rendering', () => {
    beforeEach(() => {
      cy.viewport('macbook-16');
      cy.visit('/explore');
    })
  
    it('Should have logo', () => {
        test_logo();
    })

    it('Should have search bar', () => {
        test_search_bar();
    })

    it('Should have navigation buttons', () => {
        cy.get('[data-cy=home]').should('exist');
        cy.get('[data-cy=explore]').should('exist');
        cy.get('[data-cy=profile]').should('exist');
        cy.get('[data-cy=signin]').should('exist');
    })

    it('Should have search card (before sign in)', () => {
        cy.wait(6000);
        
        cy.get('[data-cy=search-card]')
        .first()
        .click()
        .get('[data-cy=search-card-modal]')
        .get('[data-cy=sign-in]')
        .should('be.disabled');
    })

    it('Should have working search card', () => {
        cy.get('[data-cy=signin]').click();
        cy.get('[type=email]').type('amadeus.winarto@u.nus.edu');
        cy.get('[type=password]').type('testing123');
        cy.get('[data-cy=login-button]').click();

        cy.wait(6000);

        cy.get('[data-cy=search-card]')
        .first() // Try only on the first one
        .click()
        .get('[data-cy=search-card-modal]')
        .get('[data-cy=sign-in]').contains('Book Now!');
    })
  })