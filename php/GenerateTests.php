<?php

const DEFAULT_PRECISION = 0;
const DEFAULT_MODE = 'PHP_ROUND_HALF_UP';
const MODES = [
  'PHP_ROUND_HALF_UP' => PHP_ROUND_HALF_UP,
  'PHP_ROUND_HALF_DOWN' => PHP_ROUND_HALF_DOWN,
  'PHP_ROUND_HALF_EVEN' => PHP_ROUND_HALF_EVEN,
  'PHP_ROUND_HALF_ODD' => PHP_ROUND_HALF_DOWN,
];

$testsFile = file_get_contents(getcwd() . '/tests/tests.json') or die('Unable to open test file');
$proofedTestsFiles = fopen(getcwd() . '/tests/tmp/proofed_tests.json', 'w') or die ('Unable to open proof test file');
$testsFileArray = json_decode($testsFile);
$tests = $testsFileArray->tests;
$proofedTests = [];
foreach ($tests as $test) {
  $value = $test->value;
  $precision = $test->precision ?? null;
  $mode = $test->mode ?? null;

  if ($mode !== null && !array_key_exists($mode, MODES)) {
    die("Invalid mode $test->mode \r\n");
  }
  
  $proofedTests[] = [
    'value' => $value,
    'precision' => $precision,
    'mode' => $mode,
    'expected' => round(
      $value,
      $precision ?? DEFAULT_PRECISION,
      MODES[$mode ?? DEFAULT_MODE]
    )
  ];
}

fwrite($proofedTestsFiles, json_encode($proofedTests, JSON_PRETTY_PRINT));
fclose($proofedTestsFiles);
echo "Proofed Tests Written. \r\n"
?>
