import { describe, expect, it } from 'vitest';
// Muutetaan require -> import, jotta se on yhtenäinen muiden testien kanssa
import laskin from '../laskin/laskin';

describe('Laskimen testaus', function () {
  it('Tarkistetaan, että plusLasku-funktio palauttaa oikean summan yhteenlaskulla 1 + 1', function () {
    const checkSumma = laskin.plusLasku(1, 1);
    expect(checkSumma).toBe(2);
  });

  it('Tarkistetaan, että miinusLasku-funktio palauttaa oikean erotuksen vähennyslaskulla 5 - 2', function () {
    const checkSumma = laskin.miinusLasku(5, 2);
    expect(checkSumma).toBe(3);
  });
});
