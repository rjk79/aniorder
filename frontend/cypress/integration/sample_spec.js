describe('My First Test', () => {
  before(() => {
    cy.visit('localhost:3000/');
  });

  it('Allows user to input values', () => {
    cy.getBySel('app').should('eq', 'Aniorder');
  });
});
