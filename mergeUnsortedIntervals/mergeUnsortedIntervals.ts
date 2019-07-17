/**
 * Merge list of intervals.
 * Run time is O(n*log(n)) where n is the number of intervals. Sorting the
 * intervals based on start takes n*log(n) while iterating the intervals take
 * O(n).
 * @param intervals List of intervals in the format of [start, end].
 */
const mergeUnsortedIntervals = (intervals:number[][]):Array<Array<number>> => {
    // Use two constant index to make reading the code easier.
    const START_INDEX = 0, END_INDEX = 1;

    // Sort the intervals based on their start time first
    intervals.sort((a:number[], b:number[]) => a[START_INDEX] - b[START_INDEX]);

    const result:number[][] = [];
    let currentInterval = null;
    for (const interval of intervals) {
        if (!currentInterval) {
            currentInterval = interval; 
        } else {
            // New interval's start is within range and end is outisde current interval
            if (interval[START_INDEX] <= currentInterval[END_INDEX] &&
                interval[END_INDEX] > currentInterval[END_INDEX]) {
                currentInterval[END_INDEX] = interval[END_INDEX];
            } else if (interval[START_INDEX] > currentInterval[END_INDEX]) {
                // Done with merging the currentInterval, push to result and update
                // current interval to new interval.
                result.push(currentInterval);
                currentInterval = interval;
            }
        }
    }
    if (currentInterval) {
        result.push(currentInterval);
    }
    return result;
};

const sampleIntervals = [[400, 500], [0, 100], [150, 250], [200, 300], [50, 70]];
console.log(mergeUnsortedIntervals(sampleIntervals));
