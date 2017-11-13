#!/bin/bash

PROBLEM=$1
FILENAME="${PROBLEM}/${PROBLEM}"

tsc "${FILENAME}.ts"
node "${FILENAME}.js"
rm "${FILENAME}.js"
