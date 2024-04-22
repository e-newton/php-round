import { phpRound } from "../src";

/* Tests from Example #1 https://www.php.net/manual/en/function.round.php */
describe('Example #1 round tests', () => {
  test('Should round 3.4 to 3', () => {
    expect(phpRound(3.4)).toBe(3);
  });

  test('Should round 3.5 to 4', () => {
    expect(phpRound(3.5)).toBe(4);
  });

  test('Should round 3.6 to 4', () => {
    expect(phpRound(3.6)).toBe(4);
  });

  test('Should round 3.6 to 4 with 0 points of precision', () => {
    expect(phpRound(3.6, 0)).toBe(4);
  });

  test('Should round 5.045 to 5.05 with 2 points of precision', () => {
    expect(phpRound(5.045, 2)).toBe(5.05);
  });

  test('Should round 5.055 to 5.06 with 2 points of precision', () => {
    expect(phpRound(5.055, 2)).toBe(5.06);
  });

  test('Should round 345 to 300 with -2 points of precision', () => {
    expect(phpRound(345, -2)).toBe(300);
  });

  test('Should round 345 to 0 with -3 points of precision', () => {
    expect(phpRound(345, -3)).toBe(0);
  });

  test('Should round 678 to 700 with -2 points of precision', () => {
    expect(phpRound(678, -2)).toBe(700);
  });

  test('Should round 678 to 1000 with -3 points of precision', () => {
    expect(phpRound(678, -3)).toBe(1000);
  });
});
