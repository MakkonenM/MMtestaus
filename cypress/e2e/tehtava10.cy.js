describe('Tehtävä 10: Suodatustoiminnallisuus', () => {
  beforeEach(() => {
    // Vieraillaan sivulla ja tyhjennetään muisti
    cy.visit('/');
    cy.clearLocalStorage();
    cy.reload(); // Varmistetaan puhdas tila
  });

  it('Suodattaa tehtävät prioriteetin mukaan', () => {
    // 1. Luodaan High-taski
    cy.get('#topic').type('Tärkeä tehtävä');
    cy.get('#priority').select('High');
    cy.get('#save-btn').click();

    // 2. Luodaan Low-taski
    cy.get('#topic').type('Vähemmän tärkeä');
    cy.get('#priority').select('Low');
    cy.get('#save-btn').click();

    // Varmistetaan että molemmat näkyvät aluksi (koska oletus on All)
    cy.get('#task-list .task').should('have.length', 2);

    // 3. Klikataan "High" filtteriä
    cy.get('#filter-high').click();

    // Pitäisi näkyä vain 1 taski (High)
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task').first().should('contain', 'Tärkeä tehtävä');
    cy.get('#task-list .task').should('not.contain', 'Vähemmän tärkeä');

    // 4. Klikataan "Low" filtteriä
    cy.get('#filter-low').click();

    // Pitäisi näkyä vain 1 taski (Low)
    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task').first().should('contain', 'Vähemmän tärkeä');

    // 5. Klikataan "All"
    cy.get('#filter-all').click();

    // Pitäisi näkyä molemmat taskit
    cy.get('#task-list .task').should('have.length', 2);
  });
});
