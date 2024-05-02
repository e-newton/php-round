# PHP Round
## A TypeScript implementation of the PHP built-in `round` function

[![Tests](https://github.com/e-newton/php-round/actions/workflows/run-tests.yml/badge.svg)](https://github.com/e-newton/php-round/actions/workflows/run-tests.yml)
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/e-newton/973903d12880da1524ee6f9c9005ee23/raw/coverage_badge.json)

A TypeScript-based library containing functions that match built in `round` function in PHP for exact matching of numerical
values from a PHP backend. PHP rounding allows for other modes other than JavaScript's `Math.round`. It currently supports rounding
up, down, to the nearest even integer, and the to nearest odd integer.

Implemenation is transcribed from the [PHP Interpreter repo](https://github.com/php/php-src/blob/master/ext/standard/math.c).

## Installation
`php-round` contains no dependencies and should work in any Node or Browser enviroment. To install via NPM:
```
    npm install php-round
```
