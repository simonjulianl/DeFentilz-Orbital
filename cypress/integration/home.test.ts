
const test_shortcut = (label: string) => {
  cy.get(`[aria-label=${label}]`)
  .should('exist')
  .should('be.visible')
  .click();
  cy.url().should('include', `/explore?keyword=${label}`);
}

const test_logo = () => {
  cy.get('[data-cy=logo]')
  .should('be.visible');
}

const test_search_bar = () => {
  cy.get('[data-cy=search-input]')
  .invoke('attr', 'placeholder')
  .should('contain', 'Search NUS Facilities...');

  cy.get('[data-cy=search-button]')        
    .should('exist');
}

const test_carousel = () => {
  cy.get('[aria-label=carousel]')
    .should('exist');
}

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

  it('Should have sports shortcut', () => {
    test_shortcut('sports');
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

  it('Should have sports shortcut', () => {
    test_shortcut('sports')
  })

  it('Should have meeting shortcut', () => {
    test_shortcut('meeting');
  })
  
  it('Should have study shortcut', () => {
    test_shortcut('study');
  })
})