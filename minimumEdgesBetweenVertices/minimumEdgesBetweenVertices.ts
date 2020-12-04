/**
 * Given two vertices return the minimum number of edges between these two vertices.
 * @param edges Array representation of all the edges in adjancy list format.
 * @param u Starting vertex.
 * @param v Ending vertex.
 * @param numberOfVertices Total number of vertices.
 */

const minEdgesBtwnVertices = (edges:number[][], u:number, v:number, numberOfVertices: number) => {
    // vistedMap tracks whether a vertex has been visited by the BFS. Initialized to all false.
    const visitedMap:Map<number, boolean> = new Map<number, boolean>();
    for (var index:number = 0; index < numberOfVertices; index++) {
        visitedMap.set(index, false);
    }

    // distanceMap tracks how many edge hop is visiting to the vertex from <u>. The initialization
    // of the array here must specify the number of vertices because unlike the queue we need to know
    // how many key-value to fill with 0.
    const distanceMap:number[] = new Array<number>(numberOfVertices);
    distanceMap.fill(0);

    // queue is used for BFS from u to v.
    const queue:number[] = new Array<number>();
    queue.push(u);
    visitedMap.set(u, true);

    while (queue.length > 0) {
        const vertex = queue.shift();
        const neighbors = edges[vertex!];
        if (neighbors) {
            for (const connectedVertex of neighbors) {
                if (!visitedMap.get(connectedVertex)) {
                    // As long as the neighboring vertex is not yet visted we want to update the distance.
                    distanceMap[connectedVertex] = distanceMap[vertex!] + 1;
                    queue.push(connectedVertex);
                    visitedMap.set(connectedVertex, true);
                }
            }
        }
    }

    return distanceMap[v];
}

// The first index of sample Edge is a vertex, and the value of the array is an array of neighboring vertices.
// Sample:
//           ----------------
//           |              |
// 0 -- 1 -- 2 -- 3 -- 4    |
//   \  |      \  |  /      |
//    \ |       \ | /       |
//      7         5         |
//      |  \     /          |
//      |   \   /           |
//      8     6             |
//      |                   |
//      ---------------------
const sampleEdges:number[][] = [];
sampleEdges[0] = [1, 7];
sampleEdges[1] = [7, 2];
sampleEdges[2] = [3, 5, 8];
sampleEdges[3] = [4, 5];
sampleEdges[4] = [5];
sampleEdges[5] = [6];
sampleEdges[6] = [7];
sampleEdges[7] = [8];
console.log(`The distance between 0 and 5 is ${minEdgesBtwnVertices(sampleEdges, 0, 5, sampleEdges.length+1)}`);
