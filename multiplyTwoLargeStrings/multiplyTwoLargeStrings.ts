/**
 * Given two large string representations of number. Multiply them.
 * @param strA First string representation of a large number.
 * @param strB Second string representation of a large number.
 */
function multiplyLargeStrings(strA:string, strB:string):string {
    let resultStr:string = '';
    const lenA = strA.length;
    const lenB = strB.length;
    // Allocate enough size of the buffer to fix the potential result
    let resultNums:Array<number> = new Array(lenA+lenB).fill(0);
    
    let bufferLocation = 0;
    for (let strAIndex = lenA-1; strAIndex>=0; strAIndex--) {
        let carry = 0;
        for (let strBIndex = lenB-1; strBIndex>=0; strBIndex--) {
            bufferLocation = (lenA - strAIndex - 1) + (lenB - strBIndex - 1);
            const numA = parseInt(strA.charAt(strAIndex));
            const numB = parseInt(strB.charAt(strBIndex));
            const iterationResult =
                Math.floor(resultNums[bufferLocation] + numA * numB + carry);
            resultNums[bufferLocation] = Math.floor(iterationResult % 10);
            carry = Math.floor(iterationResult / 10); 
        }
        // If there is a final carry store in the next buffer location.
        if (carry > 0) {
            resultNums[bufferLocation+1] = carry;
        }
    }

    // Reconstruct the string.
    let resultNumIndex = resultNums.length - 1;
    while (resultNumIndex >= 0 && resultNums[resultNumIndex] === 0) {
        resultNumIndex--;
    }

    if (resultNumIndex < 0) {
        return '0';
    }

    while (resultNumIndex >= 0) {
        resultStr = resultStr + resultNums[resultNumIndex];
        resultNumIndex--;
    }

    return resultStr;
}

const strA:string = "1235421415454545454545454544"; 
const strB:string = "1714546546546545454544548544544545";
const correctResult = "2118187521397235888154583183918321221520083884298838480662480";
console.log(correctResult == multiplyLargeStrings(strA, strB));
