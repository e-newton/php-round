# PHP Round
### A TypeScript implementation of the PHP built-in `round` function

[![Tests](https://github.com/e-newton/php-round/actions/workflows/run-tests.yml/badge.svg)](https://github.com/e-newton/php-round/actions/workflows/run-tests.yml)
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/e-newton/973903d12880da1524ee6f9c9005ee23/raw/coverage_badge.json)

A TypeScript-based library containing functions that match built in `round` function in PHP for exact matching of numerical
values from a PHP backend. PHP rounding allows for other modes other than JavaScript's `Math.round`. It currently supports rounding
up, down, to the nearest even integer, and the to nearest odd integer.

Implemenation is transcribed from the [PHP Interpreter repository](https://github.com/php/php-src/blob/master/ext/standard/math.c) and 
is tested based on `PHP v8.1.2`.

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
