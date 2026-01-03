import { describe, expect, it } from 'vitest';
import ravintola from '../ravintola/ravintola';

describe('Ravintolan testaus', function () {
  it('Check if the customer order has a correct sum with all items ', function () {
    expect(ravintola.laskeLasku(true, true, true)).toBe(20);
  });

  it('Check if the customer order has a correct sum with only main course and drink ', () => {
    expect(ravintola.laskeLasku(false, true, true)).toBe(15);
  });
});
