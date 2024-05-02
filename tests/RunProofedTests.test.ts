import tests from "./tmp/proofed_tests.json";
import { PHPRoundMode, phpRound } from "../src";

const convertMode = (mode: string): PHPRoundMode => {
  if (mode === "PHP_ROUND_HALF_UP") return PHPRoundMode.PHP_ROUND_HALF_UP;
  if (mode === "PHP_ROUND_HALF_DOWN") return PHPRoundMode.PHP_ROUND_HALF_DOWN;
  if (mode === "PHP_ROUND_HALF_EVEN") return PHPRoundMode.PHP_ROUND_HALF_EVEN;
  if (mode === "PHP_ROUND_HALF_ODD") return PHPRoundMode.PHP_ROUND_HALF_ODD;
  throw Error(`Invalid mode found ${mode}`);
};

describe("Proofed Tests", () => {
  tests.forEach((testData) => {
    const { value, precision, mode, expected } = testData;

    const precisionLabel = precision ?? "default";
    const modeLabel = mode ?? "default";

    let actual;

    if (precision === null && mode === null) {
      actual = phpRound(value);
    } else if (precision !== null && mode === null) {
      actual = phpRound(value, precision);
    } else if (precision === null && mode !== null) {
      actual = phpRound(value, 0, convertMode(mode));
    } else {
      actual = phpRound(value, precision, convertMode(mode));
    }

    test(`Expect ${value} with ${precisionLabel} precision and ${modeLabel} mode to be ${expected}`, () => {
      expect(actual).toBe(expected);
    });
  });
});
