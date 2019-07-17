/**
 * This is a Typescript implementation of merge sort of an array of integers.
 */
function mergeSort(arr:Array<number>):Array<number> {
  // Base case of nothing to sort
  if (arr.length < 2) {
    return arr;
  }
  // Cut the array in half and sort each recursively
  const middle = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, middle);
  const rightArr = arr.slice(middle, arr.length);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(arrA:Array<number>, arrB:Array<number>) {
  const result:Array<number> = [];
  while (arrA.length && arrB.length) {
    if (arrA[0] <= arrB[0]) {
      result.push(arrA.shift()!);
    } else {
      result.push(arrB.shift()!);
    }
  }

  // Add remaining items from each array into the final result
  if (arrA.length) {
    result.push.apply(result, arrA);
  } else if (arrB.length) {
    result.push.apply(result, arrB);
  }

  return result;
}

const exampleArr:Array<number> = [41, 2, 33, 8, 9, 7, 5, 77, 33];
console.log(mergeSort(exampleArr));
