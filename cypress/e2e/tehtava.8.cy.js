describe('Todo app - Testaussuunnitelman mukaiset testit', () => {
  beforeEach(() => {
    // Yhdistyy configin osoitteeseen
    cy.visit('/');
    cy.clearLocalStorage();
  });

  // 1. Tehtävän lisäys
  it('Lisää uuden tehtävän ja näyttää sen listassa', () => {
    cy.get('#topic').type('Testitaski').should('have.value', 'Testitaski');
    cy.get('#description').type('Testitaskin kuvaus');
    cy.get('#save-btn').click();

    cy.get('#task-list .task').should('have.length', 1);
    cy.get('#task-list .task').first().should('contain', 'Testitaski');
  });

  // 2. Lomakkeen tyhjennys (Reset)
  it('Tyhjentää lomakkeen Reset-painikkeella', () => {
    cy.get('#topic').type('Tämä pitäisi hävitä');
    cy.get('#description').type('Älä tallenna tätä');

    // Etsitään nappi, jossa lukee "Reset"
    cy.contains('button', 'Reset').click();

    cy.get('#topic').should('have.value', '');
    cy.get('#description').should('have.value', '');
  });

  // 3. Muistin toimivuus (sivun päivitys)
  it('Säilyttää tehtävän sivun päivityksen (F5) jälkeen', () => {
    cy.get('#topic').type('Pysyvä taski');
    cy.get('#save-btn').click();

    cy.get('#task-list').should('contain', 'Pysyvä taski');

    cy.reload();

    cy.get('#task-list').should('contain', 'Pysyvä taski');
  });

  // 4. Prioriteetin valinta
  it('Tallentaa tehtävän oikealla prioriteetilla (High)', () => {
    cy.get('#topic').type('Tärkeä taski');

    // Valitaan prioriteetti
    cy.get('#priority').select('High');
    cy.get('#save-btn').click();

    // Tarkistetaan localStoragesta
    cy.window().then((win) => {
      const tasks = JSON.parse(win.localStorage.getItem('todo_tasks_v1'));
      expect(tasks[0].priority).to.equal('high');
    });
  });
});
