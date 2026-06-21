#!/usr/bin/env bash
#
# Compiles a problem's solution.ts once, then runs it against every test case in
# that problem folder and compares each program output to the expected output.
#
# Test cases are discovered automatically: every <problem>/input*.txt is paired
# with the matching <problem>/expected*.txt
#   (input.txt  -> expected.txt,  input2.txt -> expected2.txt,  ...).
#
# Usage:  ./run-test.sh [problem-folder]
#         ./run-test.sh                 # defaults to sockMerchant
#         ./run-test.sh countingValleys
#
set -euo pipefail

# Always run relative to this script's directory (HackerRank/).
cd "$(dirname "$0")"

REPO_ROOT="$(cd .. && pwd)"
CASE_DIR="${1:-sockMerchant}"
BUILD_DIR="build"

if [ ! -f "$CASE_DIR/solution.ts" ]; then
  echo "Error: $CASE_DIR/solution.ts not found." >&2
  exit 1
fi

echo "==> Compiling solution.ts ..."
# Use the repo's local TypeScript; solution.ts uses Set iteration, so downlevelIteration is on.
npx --prefix "$REPO_ROOT" tsc "$CASE_DIR/solution.ts" \
  --outDir "$BUILD_DIR" \
  --target ES2020 \
  --module commonjs \
  --downlevelIteration

pass=0
fail=0

# Iterate test cases in a stable (sorted) order.
for input in $(ls "$CASE_DIR"/input*.txt | sort); do
  expected="${input/input/expected}"

  if [ ! -f "$expected" ]; then
    echo "==> SKIP $input (no matching $expected)"
    continue
  fi

  # solution.ts writes its result to the file named by $OUTPUT_PATH (HackerRank convention).
  OUTPUT_PATH="$(mktemp)"
  export OUTPUT_PATH

  node "$BUILD_DIR/solution.js" < "$input"

  actual="$(cat "$OUTPUT_PATH")"
  expected_val="$(cat "$expected")"
  rm -f "$OUTPUT_PATH"

  if [ "$actual" = "$expected_val" ]; then
    echo "==> PASS ✅  $input  (expected $expected_val, got $actual)"
    pass=$((pass + 1))
  else
    echo "==> FAIL ❌  $input  (expected $expected_val, got $actual)"
    fail=$((fail + 1))
  fi
done

echo "----"
echo "Results: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
