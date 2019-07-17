const DEBUGGING = false;

enum Occupancy {
    EMPTY,
    BIKE,
    RIDER
}

// Make sure not use Location as that would conflict with JavaScript's Location type.
interface Loc {
    readonly y: number,
    readonly x: number
}

/**
 * Given a 2-D map of all bikes and riders, pair them up so each person get's their closest
 * bike unless there was someone else closer to that bike for whom it is their closest bike.
 * @param blockMap A map of all bikes and riders.
 */
const generateSolutionForBikesAndRiders = (blockMap:Array<Array<Occupancy>>) => {
    // Find all bikes and riders. O(size of matrix)
    const bikes:Set<Loc> = new Set();
    const riders:Set<Loc> = new Set();
    for (let row=0; row<blockMap.length; row++) {
        for (let column=0; column<blockMap[0].length; column++) {
            if (blockMap[row][column] === Occupancy.BIKE) {
                bikes.add({y: row, x: column});
            } else if (blockMap[row][column] == Occupancy.RIDER) {
                riders.add({y: row, x:column});
            }
        }
    }

    // Calculate distance between all bikes and riders O(b*r) where b is number
    // of bikes and r is number of riders.
    const distanceList:Array<{distance: number, bike:Loc, rider: Loc}> = new Array();
    for (let bike of bikes.values()) {
        for (let rider of riders.values()) {
            const d = Math.abs(bike.y - rider.y) + Math.abs(bike.x - rider.x);
            distanceList.push({distance:d, bike, rider});
        }
    }

    // Sort distance in ascending order. O(b*r log(b*r))
    distanceList.sort((a,b) => a.distance - b.distance);
    if (DEBUGGING) { console.log(distanceList); }

    // Start pulling from the smallest distance till everyone is assigned.
    for (let distance of distanceList) {
        if (bikes.has(distance.bike) && riders.has(distance.rider)) {
            console.log(`Rider at [${distance.rider.y},${distance.rider.x}] should ` +
                `travel distance ${distance.distance} to [${distance.bike.y}, ${distance.bike.x}] ` +
                `to get the bike.`);
            bikes.delete(distance.bike);
            riders.delete(distance.rider);
        }
    }
}

const sampleBlockMap = [
    [Occupancy.EMPTY, Occupancy.BIKE, Occupancy.RIDER],
    [Occupancy.RIDER, Occupancy.EMPTY, Occupancy.EMPTY],
    [Occupancy.EMPTY, Occupancy.EMPTY, Occupancy.BIKE]
];
if (DEBUGGING) console.log(sampleBlockMap);
generateSolutionForBikesAndRiders(sampleBlockMap);
