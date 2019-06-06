interface Item {
    v: number;
    w: number;
}

/**
 * Returns the maximum value we could get.
 * @param items List of items with value and weight.
 * @param capacity The weight capacity we could fit in a bag.
 * @returns Maxium value obtainable given the capacity constraint.
 */
function knapSack(items:Array<Item>, capacity:number) {
    // maxValueMap[itemIndex, weight] signals the maximum value
    // the user can get using items up to but excluding itemIndex.
    const maxValueMap:Array<Array<number>> = new Array(items.length+1);
    for (let itemIndex = 0; itemIndex <= items.length; itemIndex++) {
        maxValueMap[itemIndex] = new Array(capacity+1);
    }

    // Initialize without using any items we have no values for all
    // weights.
    for (let weight=0; weight<=capacity; weight++) {
        maxValueMap[0][weight] = 0;
    }

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        for (let weight = 0; weight <= capacity; weight++) {
            const item:Item = items[itemIndex];
            if (item.w > weight) {
                // If the item is heavier than the weight allow, the value
                // we can get is the same as without this item.
                maxValueMap[itemIndex+1][weight] = maxValueMap[itemIndex][weight];
            } else {
                // If we could fit the item, the maximum value we could
                // get would be either without the item or add this item value
                // to the bag plus maximum value we could get using all
                // previous items minus this new item's weight.
                maxValueMap[itemIndex+1][weight] =
                    Math.max(maxValueMap[itemIndex][weight],
                             maxValueMap[itemIndex][weight-item.w] + item.v);
            }
        }
    }

    return maxValueMap[items.length][capacity];
}

const items = [
    {w:70,v:135},
    {w:73,v:139},
    {w:77,v:149},
    {w:80,v:150},
    {w:82,v:156},
    {w:87,v:163},
    {w:90,v:173},
    {w:94,v:184},
    {w:98,v:192},
    {w:106,v:201},
    {w:110,v:210},
    {w:113,v:214},
    {w:115,v:221},
    {w:118,v:229},
    {w:120,v:240},
];
    
const capacity = 750;
console.log(knapSack(items, capacity));
