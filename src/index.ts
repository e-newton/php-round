
enum PHPRoundMode {
  PHP_ROUND_HALF_UP = 0x01,
  PHP_ROUND_HALF_DOWN = 0x02,
  PHP_ROUND_HALF_EVEN = 0x03,
  PHP_ROUND_HALF_ODD = 0x04,
}

function round(num: number, precision: number, mode: PHPRoundMode): number {
  return 0;
};
