// Using Set<> in Typescript.
const findDuplicate = (arr:number[]):number|null => {
    const numberSet = new Set<number>();
    for (const num of arr) {
      if (numberSet.has(num)) {
        return num;
      } else {
        numberSet.add(num);
      }
    }
    return null;
}

const duplicatedArr = [1,2,3,4,2];
console.log(`The duplicate in ${duplicatedArr} is ${findDuplicate(duplicatedArr)}`);

// Sorting in Typescript
const arr = [5,2,3,1,4];
arr.sort((a:number, b:number) => a-b);
console.log(`Sorted array is ${arr}`);

