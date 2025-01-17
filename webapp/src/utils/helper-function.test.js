import { intToRoman } from './helper-fuction';

describe('intToRoman', () => {
  it('should convert integers to roman numerals', () => {
    expect(intToRoman(3)).toBe('III');
    expect(intToRoman(4)).toBe('IV');
    expect(intToRoman(9)).toBe('IX');
    expect(intToRoman(58)).toBe('LVIII');
    expect(intToRoman(1994)).toBe('MCMXCIV');
  });
});
