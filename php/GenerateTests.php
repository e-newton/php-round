<?php
function createTestArray(int|float $number, int $precision, int $mode, int|float $result) {
  return [
    'num' => $number,
    'precision' => $precision,
    'mode' => $mode,
    'expected' => $result
  ];
}

function generateRandomTest(int $precision, int $mode) {
  $aFloat = rand(0, 10 ** 10) / (10 ** 10);
  $aInt = rand(-1000, 1000);
  $a = $aInt + $aFloat;
  $rounded = round($a, $precision, $mode);
  return createTestArray($a, $precision, $mode, $rounded);
}

function generateHalfTest(int $precision, int $mode) {
  $aFloat = (0.5 * 10 ** 10) / (10 ** 10);
  $aInt = rand(-10 ** 10, 10 ** 10);
  $a = $aInt + $aFloat;
  $rounded = round($a, $precision, $mode);
  return createTestArray($a, $precision, $mode, $rounded);
}
$testFile = fopen(getcwd() . '/tests/roundTests.json', 'w') or die('Unable to open test file');
$results = [];
for ($precision = -10; $precision <= 10; $precision++) {
  for ($i = 0; $i < 100; $i++) {
    $results[] = generateRandomTest($precision, PHP_ROUND_HALF_UP);
    $results[] = generateHalfTest($precision, PHP_ROUND_HALF_UP);
  }
}
for ($precision = -10; $precision <= 10; $precision++) {
  for ($i = 0; $i < 100; $i++) {
    $results[] = generateRandomTest($precision, PHP_ROUND_HALF_DOWN);
    $results[] = generateHalfTest($precision, PHP_ROUND_HALF_DOWN);
  }
}
for ($precision = -10; $precision <= 10; $precision++) {
  for ($i = 0; $i < 100; $i++) {
    $results[] = generateRandomTest($precision, PHP_ROUND_HALF_EVEN);
    $results[] = generateHalfTest($precision, PHP_ROUND_HALF_EVEN);
  }
}
for ($precision = -10; $precision <= 10; $precision++) {
  for ($i = 0; $i < 100; $i++) {
    $results[] = generateRandomTest($precision, PHP_ROUND_HALF_ODD);
    $results[] = generateHalfTest($precision, PHP_ROUND_HALF_ODD);
  }
}
fwrite($testFile, json_encode($results));
?>
