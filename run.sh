#!/bin/bash

PROBLEM=$1
FILENAME="${PROBLEM}/${PROBLEM}"

tsc --lib 'es6','dom' --downlevelIteration "${FILENAME}.ts"
node "${FILENAME}.js"
rm "${FILENAME}.js"
