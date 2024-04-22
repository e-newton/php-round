import { phpRound } from "../src";

describe('Testing round() : basic functionality', () => {
  test('round: 123456789', () => {
    expect(phpRound(123456789, 2)).toBe(123456789);
    expect(phpRound(123456789, 8)).toBe(123456789);
    expect(phpRound(123456789, 3)).toBe(123456789);
    expect(phpRound(123456789, 4)).toBe(123456789);
  });

  test('round: 123.456789', () => {
    expect(phpRound(123.456789, 2)).toBe(123.46);
    expect(phpRound(123.456789, 8)).toBe(123.456789);
    expect(phpRound(123.456789, 3)).toBe(123.457);
    expect(phpRound(123.456789, 4)).toBe(123.4568);
  });

  test('round: -4.56789123', () => {
    expect(phpRound(-4.56789123, 2)).toBe(-4.57);
    expect(phpRound(-4.56789123, 8)).toBe(-4.56789123);
    expect(phpRound(-4.56789123, 3)).toBe(-4.568);
    expect(phpRound(-4.56789123, 4)).toBe(-4.5679);
  });

  test('round: 12300', () => {
    expect(phpRound(12300, 2)).toBe(12300);
    expect(phpRound(12300, 8)).toBe(12300);
    expect(phpRound(12300, 3)).toBe(12300);
    expect(phpRound(12300, 4)).toBe(12300);
  });

  test('round: -4567', () => {
    expect(phpRound(-4567, 2)).toBe(-4567);
    expect(phpRound(-4567, 8)).toBe(-4567);
    expect(phpRound(-4567, 3)).toBe(-4567);
    expect(phpRound(-4567, 4)).toBe(-4567);
  });
});
