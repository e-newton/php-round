enum PHPRoundMode {
  PHP_ROUND_HALF_UP = 0x01,
  PHP_ROUND_HALF_DOWN = 0x02,
  PHP_ROUND_HALF_EVEN = 0x03,
  PHP_ROUND_HALF_ODD = 0x04,
}

function phpRound(
  value: number,
  precision: number = 0,
  mode: PHPRoundMode = PHPRoundMode.PHP_ROUND_HALF_UP,
): number {
  let tmpValue, tmpValue2: number;
  if (!Number.isFinite(value) || value === 0.0) {
    return value;
  }
  const places =
    precision < Number.MIN_SAFE_INTEGER + 1
      ? Number.MIN_SAFE_INTEGER
      : precision;
  const exponent = 10 ** Math.abs(precision);

  /**
   * When extracting the integer part, the result may be incorrect as a decimal
   * number due to floating point errors.
   * e.g.
   * 0.285 * 10000000000 => 2849999999.9999995
   * floor(0.285 * 10000000000) => 2849999999
   *
   * Add 1 to the absolute value of the value adjusted by floor or ceil, use the
   * exponent to return it to its original precision, and compare it with value.
   * If it is equal to value, it is assumed that the absolute value is 1 smaller
   * due to error and will be corrected.
   * e.g.
   * 0.285 * 10000000000 => 2849999999.9999995
   * floor(0.285 * 10000000000) => 2849999999 (tmp_value)
   * tmp_value2 = 2849999999 + 1 => 2850000000
   * 2850000000 / 10000000000 == 0.285 => true
   * tmp_value = tmp_value2
   */

  if (value >= 0.0) {
    tmpValue = Math.floor(places > 0 ? value * exponent : value / exponent);
    tmpValue2 = tmpValue + 1;
  } else {
    tmpValue = Math.ceil(places > 0 ? value * exponent : value / exponent);
    tmpValue2 = tmpValue - 1;
  }

  if ((places > 0 ? tmpValue2 / exponent : tmpValue2 * exponent) === value) {
    tmpValue = tmpValue2;
  }

  /* This value is beyond our precision, so rounding it is pointless */
  if (Math.abs(tmpValue) >= 1e16) {
    return value;
  }

  /* round the temp value */
  tmpValue = phpRoundHelper(tmpValue, value, exponent, places, mode);

  /* see if it makes sense to use simple division to round the value */
  if (Math.abs(places) < 23) {
    if (places > 0) {
      tmpValue = tmpValue / exponent;
    } else {
      tmpValue = tmpValue * exponent;
    }
  } else {
    /* Simple division can't be used since that will cause wrong results.
   Instead, the number is converted to a string and back again */
    tmpValue = parseFloat(`${tmpValue}e${-places}`);
    /* couldn't convert to string and back */
    if (!Number.isFinite(tmpValue) || Number.isNaN(tmpValue)) {
      tmpValue = value;
    }
  }
  return tmpValue;
}

function phpRoundHelper(
  integral: number,
  value: number,
  exponent: number,
  places: number,
  mode: PHPRoundMode,
): number {
  const valueAbs = Math.abs(value);
  let edgeCase;

  switch (mode) {
    case PHPRoundMode.PHP_ROUND_HALF_UP: {
      edgeCase = phpRoundGetBasicEdgeCase(integral, exponent, places);
      if (valueAbs >= edgeCase) {
        return integral + copysign(1.0, integral);
      }
      return integral;
    }
    case PHPRoundMode.PHP_ROUND_HALF_DOWN: {
      edgeCase = phpRoundGetBasicEdgeCase(integral, exponent, places);
      if (valueAbs > edgeCase) {
        return integral + copysign(1.0, integral);
      }
      return integral;
    }

    default:
      throw new Error("Invalid PHP round mode");
  }
}

function phpRoundGetBasicEdgeCase(
  integral: number,
  exponent: number,
  places: number,
): number {
  return places > 0
    ? Math.abs((integral + copysign(0.5, integral)) / exponent)
    : Math.abs((integral + copysign(0.5, integral)) * exponent);
}

function copysign(x: number, y: number): number {
  if (Object.is(y, 0)) {
    return Math.abs(x);
  }
  if (Object.is(y, -0)) {
    return -Math.abs(x);
  }
  return x * Math.sign(y);
}

export { phpRound, PHPRoundMode };
