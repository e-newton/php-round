import { phpRound } from "../src";

describe('Edge Cases', () => {
  test('Rounding number near the floating point limit should return the number itself', () => {
    expect(phpRound(1.7976931348623157e+308, -308)).toBe(1.7976931348623157e+308);
    expect(phpRound(1.7976931348623157e+308, 308)).toBe(1.7976931348623157e+308);
    expect(phpRound(2.220446049250313e-16, 50)).toBe(2.220446049250313e-16);
  });

  test('Should throw error if invalid mode is passed', () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      phpRound(9.5, 1, -1 as any)
    ).toThrow();
  });

  test('Negative zero', () => {
    expect(phpRound(-0.5)).toBe(-1);
  });
});
