enum PHPRoundMode {
  PHP_ROUND_HALF_UP = 0x01,
  PHP_ROUND_HALF_DOWN = 0x02,
  PHP_ROUND_HALF_EVEN = 0x03,
  PHP_ROUND_HALF_ODD = 0x04,
}

function phpRound(
  value: number,
  precision: number = 0,
  mode: PHPRoundMode = PHPRoundMode.PHP_ROUND_HALF_UP
): number {
  let tmpValue, tmpValue2: number;
  if (!Number.isFinite(value) || value === 0.0) {
    return value;
  }
  const places = precision < Number.MIN_SAFE_INTEGER + 1 ? Number.MIN_SAFE_INTEGER : precision;
  const exponent = 10 ** Math.abs(precision);

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

  if (Math.abs(tmpValue) >= 1e16) {
    return value;
  }

  tmpValue = phpRoundHelper(tmpValue, value, exponent, places, mode);

  if (Math.abs(places) < 23) {
    if (places > 0 ) {
      tmpValue = tmpValue / exponent;
    } else {
      tmpValue = tmpValue * exponent;
    }
  } else {
    const convertedNumber = parseFloat(`${tmpValue}e${-places}`);
    if (!Number.isFinite(convertedNumber) || Number.isNaN(convertedNumber)) {
      tmpValue = value;
    }
  }
  return tmpValue;
};

function phpRoundHelper(
  integral: number,
  value: number,
  exponent: number,
  places: number,
  mode: PHPRoundMode
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

    default: throw new Error('Invalid round mode');
  }
}

function phpRoundGetBasicEdgeCase(integral: number, exponent: number, places: number): number {
  return (places > 0)
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
