describe('Secret Menu with Cypress Studio', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('does stuff generated by Cypress Studio', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#minimum-rating-visibility').click();
    cy.get('#minimum-rating-visibility').type('5');
    cy.get('#restaurant-visibility-filter').select('KFC');
    cy.get(':nth-child(1) > .whereToOrder > .cell').should('have.text', 'KFC');
    /* ==== End Cypress Studio ==== */
  });
});
