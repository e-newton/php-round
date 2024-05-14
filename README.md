# PHP Round
### A TypeScript implementation of the PHP built-in `round` function

[![Tests](https://github.com/e-newton/php-round/actions/workflows/run-tests.yml/badge.svg)](https://github.com/e-newton/php-round/actions/workflows/run-tests.yml)
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/e-newton/973903d12880da1524ee6f9c9005ee23/raw/coverage_badge.json)

A TypeScript-based library containing functions that match built in `round` function in PHP for exact matching of numerical
values from a PHP backend. PHP rounding allows for other modes other than JavaScript's `Math.round`. It currently supports rounding
up, down, to the nearest even integer, and the to nearest odd integer.

Implemenation is transcribed from the [PHP Interpreter repository](https://github.com/php/php-src/blob/master/ext/standard/math.c) and 
is tested based on `PHP v8.1.2`.

## Usage

```
    phpRound(
        value: number,
        precision: number = 0,
        mode: PHPRoundMode = PHPRoundMode.PHP_ROUND_HALF_UP
    );
```

Returns the rounded value of `value` to a specified precision (number of places after then decimal place). 
`precision` can also be negative to round to a number of decimals places before the decimal place. `precision` of zero means
to round to the nearest integer.

### Modes

`phpRound` supports the rounding modes found in `PHP v8.1.2`. Either the TypeScript enum can be used or the numerical value
based on the values defined in the [PHP Interpreter repository.](https://github.com/php/php-src/blob/master/ext/standard/php_math_round_mode.h)

```
    enum PHPRoundMode {
      PHP_ROUND_HALF_UP = 0x01,
      PHP_ROUND_HALF_DOWN = 0x02,
      PHP_ROUND_HALF_EVEN = 0x03,
      PHP_ROUND_HALF_ODD = 0x04,
    }
```

|Mode                 | Description                                                                                              |
|---------------------|----------------------------------------------------------------------------------------------------------|
|`PHP_ROUND_HALF_UP`  | Rounds `value` away from zero when it is half way there, making 1.5 into 2, and -1.5 into -2.            |
|`PHP_ROUND_HALF_DOWN`| Rounds `value` towards from zero when it is half way there, making 1.5 into 1, and -1.5 into -1.         |
|`PHP_ROUND_HALF_EVEN`| Rounds `value` towards the nearest even value when it is half way there, making both 1.5 and 2.5 into 2. |
|`PHP_ROUND_HALF_ODD` | Rounds `value` towards the nearest odd value when it is half way there, making 1.5 into 1 and 2.5 into 3.|


For example:
```
    phpRound(9.5, 0, PhpRoundMode.PHP_ROUND_HALF_UP) // 10
    phpRound(9.5, 0, PhpRoundMode.PHP_ROUND_HALF_DOWN) // 9
    phpRound(9.5, 0, PhpRoundMode.PHP_ROUND_HALF_EVEN) // 10
    phpRound(9.5, 0, PhpRoundMode.PHP_ROUND_HALF_ODD) // 9

    phpRound(8.5, 0, PhpRoundMode.PHP_ROUND_HALF_UP) // 9
    phpRound(8.5, 0, PhpRoundMode.PHP_ROUND_HALF_DOWN) // 8
    phpRound(8.5, 0, PhpRoundMode.PHP_ROUND_HALF_EVEN) // 8
    phpRound(8.5, 0, PhpRoundMode.PHP_ROUND_HALF_ODD) // 9
```


## Installation
`php-round` contains no dependencies and should work in any Node or Browser enviroment. To install via NPM:
```
    npm install php-round
```

## Development
To get started with development, first install PHP to the current supported version of [`8.1.2`](https://www.php.net/downloads)

After install the dev dependencies with 
```
    npm install
```

To run tests use
```
    npm test
```

Running the tests will first proof the `test.json` file against the install PHP version and generate Jenkins
tests which will then be run against `phpRound`. We currently aim for 100% code coverage in branches, functions, and statements.
