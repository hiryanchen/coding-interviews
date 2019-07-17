enum Occupancy {
    EMPTY,
    BIKE,
    RIDER
}

const generateSolutionForBikesAndRiders = (blockMap:Array<Array<Occupancy>>) => {
    
}

const sampleBlockMap = [
    [Occupancy.EMPTY, Occupancy.BIKE, Occupancy.RIDER],
    [Occupancy.RIDER, Occupancy.EMPTY, Occupancy.EMPTY],
    [Occupancy.BIKE, Occupancy.EMPTY, Occupancy.EMPTY]
];
console.log(generateSolutionForBikesAndRiders(sampleBlockMap));