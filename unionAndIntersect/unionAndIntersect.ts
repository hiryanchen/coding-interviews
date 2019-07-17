function pushIfNew(result: Array<number>, candidate: number) {
    if (result.length === 0 || result[length - 1] !== candidate) {
        result.push(candidate);
    }
}

/** Union two lists of numbers.
 * @param a a list of numbers in ascending order
 * @param b a list of numbers in ascending order
 * @return List of non-duplicated numbers in ascending order
 *
 * a -> [1, 1, 1, 3, 4, 5, 8]
 * b -> [1, 1, 2, 3, 6, 7]
 * result -> [1, 2, 3, 4, 5, 6, 7, 8]
 */
function union(a: Array<number>, b: Array<number>):Array<number> {
    const result: Array<number> = new Array();
    let aIndex = 0;
    let bIndex = 0;
    while (aIndex < a.length && bIndex < b.length) {
        if (a[aIndex] < b[bIndex]) {
            pushIfNew(result, a[aIndex]);
            aIndex++;
        } else if (a[aIndex] > b[bIndex]) {
            pushIfNew(result, b[bIndex]);
            bIndex++;
        } else {
            pushIfNew(result, a[aIndex]);
            aIndex++;
            bIndex++;
        }
    }
    // TODO: refactor to single function
    while (aIndex < a.length) {
        pushIfNew(result, a[aIndex]);
        aIndex++;
    }
    while (bIndex < b.length) {
        pushIfNew(result, b[bIndex]);
        bIndex++;
    }
    return result;
}

/** Intersect two lists of numbers.
 * @param a a list numbers in ascending order.
 * @param b a list numbers in ascending order.
 * @return List of intersected numbers in ascending order.
 *
 * a -> [1, 1, 1, 3, 4, 5, 8]
 * b -> [1, 1, 2, 3, 5, 8]
 * result -> [1, 3, 5, 8]
 */
function intersect(a: Array<number>, b: Array<number>): Array<number> {
    const existingNumbers: Set<number> = new Set();
    const result: Array<number> = new Array();
    for (const elem of a) {
        if (!existingNumbers.has(elem)) {
            existingNumbers.add(elem);
        }
    }
    for (const elem of b) {
        if (existingNumbers.has(elem) &&
            (result.length === 0 || result[result.length-1] !== elem)) {
            result.push(elem);
        }
    }
    return result;
}
