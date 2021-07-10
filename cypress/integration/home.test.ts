import { test_carousel, test_logo, test_search_bar, test_shortcut } from 'cypress/integration/commonTests';

describe('Mobile Home Page Rendering', () => {
  beforeEach(() => {
    cy.viewport('iphone-6+');
    cy.visit('/home');
  })

  it('Should have logo', () => {
    test_logo();
  })

  it('Should have search bar', () => {
    test_search_bar();
  })

  it('Should have carousel', () => {
    test_carousel();
  })

  it('Should not have navigation buttons', () => {
    cy.get('[data-cy=home]').should('not.exist');
    cy.get('[data-cy=explore]').should('not.exist');
    cy.get('[data-cy=profile]').should('not.exist');
    cy.get('[data-cy=signin]').should('not.exist');
  })

  it('Should have navigation drawer', () => {
    cy.get('[data-cy=nav-drawer-button]').click();
    cy.get('[aria-label=sign-up]')
      .get('[aria-label=sign-in]')
  })

  it('Should have sport shortcut', () => {
    test_shortcut('sport');
  })

  it('Should have meeting shortcut', () => {
    test_shortcut('meeting');
  })
  
  it('Should have study shortcut', () => {
    test_shortcut('study');
  })
})

describe('Desktop Home Page Rendering', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit('/home');
  })

  it('Should have logo', () => {
    test_logo();
  })

  it('Should have search bar', () => {
    test_search_bar();
  })

  it('Should have carousel', () => {
    test_carousel();
  })

  it('Should have navigation buttons', () => {
    cy.get('[data-cy=home]').should('exist');
    cy.get('[data-cy=explore]').should('exist');
    cy.get('[data-cy=profile]').should('exist');
    cy.get('[data-cy=signin]').should('exist');
  })

  it('Should not have navigation drawer', () => {
    cy.get('[data-cy=nav-drawer-button]').should('not.exist');
  })

  it('Should have sport shortcut', () => {
    test_shortcut('sport')
  })

  it('Should have meeting shortcut', () => {
    test_shortcut('meeting');
  })
  
  it('Should have study shortcut', () => {
    test_shortcut('study');
  })
})