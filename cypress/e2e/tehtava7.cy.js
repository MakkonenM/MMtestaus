describe('Tehtävä 7: End-to-end testaus', () => {
  // --- TEHTÄVÄ 1: WIKIPEDIA ---
  it('Wikipedia haku ja kielenvaihto', () => {
    // 1. Suurennetaan näyttöä
    cy.viewport(1200, 800);

    cy.visit('https://fi.wikipedia.org');

    // 2. Kirjoitetaan haku "Jamk"
    cy.get('input[name="search"]').first().type('Jamk');

    // 3. Valitaan ehdotus listalta
    cy.wait(1000);
    cy.contains('Jyväskylän ammattikorkeakoulu').click();

    // 4. Tarkista URL
    cy.url({ timeout: 10000 }).should(
      'include',
      'Jyv%C3%A4skyl%C3%A4n_ammattikorkeakoulu'
    );

    // 5. Rullaa kohtaan "Kampukset"
    cy.contains('h2', 'Kampukset')
      .scrollIntoView({ duration: 2000 })
      .should('be.visible');

    // 6. Odotus (5 sekuntia paikallaan)
    cy.wait(5000);

    // 7. Vaihda kieli englanniksi
    cy.contains('a', 'English').click({ force: true });

    // 8. Tarkista uusi URL
    cy.url().should('include', 'JAMK_University_of_Applied_Sciences');
  });

  // --- TEHTÄVÄ 2: PIZZA ONLINE ---
  it('Pizza-online tilaus', () => {
    cy.visit('https://tiko.jamk.fi/~imjar/fronttiper/esimteht/pizza_anim/');

    // Täytetään lomake
    cy.get('#nimi')
      .type('Olli Opiskelija')
      .should('have.value', 'Olli Opiskelija');
    cy.get('#puhelin').type('0401234567').should('have.value', '0401234567');
    cy.get('#sposti').type('olli@jamk.fi').should('have.value', 'olli@jamk.fi');

    cy.get('#koko').select('Suuri');

    // Valitaan täytteet
    cy.get('[for="Gluteeniton"]').click();
    cy.get('[for="Kinkku"]').click();
    cy.get('[for="Salami"]').click();

    // Tarkistetaan hinta
    cy.get('.lomake > :nth-child(8)').should('contain', '14.50');
  });
});
