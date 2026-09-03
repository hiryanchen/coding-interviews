// TypeScript Interface
interface Result {
  duplicate: number|null;
  indexes: number[];
};

// Using Set<> in Typescript.
const findDuplicate = (arr:number[]):Result => {
    const numberSet = new Set<number>();
    let result:Result = {
      duplicate: null,
      indexes: []
    }
    // Array loop beyond for (const num of arr) {
    for (const [i, num] of arr.entries()) {
      if (numberSet.has(num)) {
        result.duplicate = num;
        result.indexes.push(i);
      } else {
        numberSet.add(num);
      }
    }
    return result;
}

const lg = console.log;
const duplicatedArr = [1,2,3,2,4,2];
const result = findDuplicate(duplicatedArr);
lg(`The duplicate in ${duplicatedArr} is ${result.duplicate}
at indexes ${result.indexes}`);

// Array sorting
const sortableArr = [5,2,3,1,4];
sortableArr.sort((a:number, b:number) => a-b);
lg(`In place sorted array is ${sortableArr}`);

// Promies
const promiseToFindDuplicate = (arr:number[]):Promise<Result> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(findDuplicate(arr));
    } catch (error) {
      reject(error);
    }
  });
}
promiseToFindDuplicate(duplicatedArr).then(result => {
  lg(`Promise result:`, result);
}).catch(error => {
  lg(`Promise error:`, error);
});