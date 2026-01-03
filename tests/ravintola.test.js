import { describe, expect, it, beforeEach } from 'vitest';
import ravintola from '../ravintola/ravintola';

describe('Ravintolan yksikkötestit - Tehtävä 2', function () {
  beforeEach(() => {
    ravintola.generoiPaikat();
  });

  it('Varaus onnistuu sallitulla asiakasmäärällä', function () {
    const tilaukset = ravintola.syoRavintolassa(5);
    expect(tilaukset.length).toBe(5);
  });

  it('Virhe heitetään, kun kapasiteetti ylittyy', () => {
    ravintola.syoRavintolassa(10);
    expect(() => ravintola.syoRavintolassa(6)).toThrowError(
      'Ravintola on täynnä.'
    );
  });

  it('Laskun laskeminen toimii hinta-olioilla', () => {
    const testiRuoat = [
      { ruoka: 'Pääruoka', hinta: 6 },
      { ruoka: 'Juoma', hinta: 2 },
    ];
    expect(ravintola.laskeLasku(testiRuoat)).toBe(8);
  });
});
