import { phpRound } from "../src";

const LONG_MAX = 9223372036854775807;
const LONG_MIN = -LONG_MAX - 1;
describe('round.phpt tests', () => {
  test('LONG_MIN tests', () => {
    expect(phpRound(LONG_MIN - 0.6)).toBeCloseTo(LONG_MIN - 1, 12);
    expect(phpRound(LONG_MIN - 0.4)).toBeCloseTo(LONG_MIN, 12);
    expect(phpRound(LONG_MIN + 0.4)).toBeCloseTo(LONG_MIN, 12);
    expect(phpRound(LONG_MIN + 0.6)).toBeCloseTo(LONG_MIN + 1, 12);
  });
  test('LONG_MAX tests', () => {
    expect(phpRound(LONG_MAX - 0.6)).toBeCloseTo(LONG_MAX - 1, 12);
    expect(phpRound(LONG_MAX - 0.4)).toBeCloseTo(LONG_MAX, 12);
    expect(phpRound(LONG_MAX + 0.4)).toBeCloseTo(LONG_MAX, 12);
    expect(phpRound(LONG_MAX + 0.6)).toBeCloseTo(LONG_MAX + 1, 12);
  });
});
