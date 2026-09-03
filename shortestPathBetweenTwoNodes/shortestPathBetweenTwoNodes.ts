function bidirectionalBFS(
    graph: { [key: string]: string[] },
    start: string,
    destination: string
): number {
    if (start === destination) {
        return 0;
    }

    // Track visited states and distances independently for both sides
    const forwardVisited: { [key: string]: number } = { [start]: 0 };
    const backwardVisited: { [key: string]: number } = { [destination]: 0 };

    // Frontiers for both sides
    const forwardQueue: string[] = [start];
    const backwardQueue: string[] = [destination];

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
        // Optimization: Always choose the smaller queue to expand next
        let currentNode: string;
        let currentVisited: { [key: string]: number };
        let targetVisited: { [key: string]: number };
        let nextQueue: string[];

        if (forwardQueue.length <= backwardQueue.length) {
            currentNode = forwardQueue.shift()!;
            currentVisited = forwardVisited;
            targetVisited = backwardVisited;
            nextQueue = forwardQueue;
        } else {
            currentNode = backwardQueue.shift()!;
            currentVisited = backwardVisited;
            targetVisited = forwardVisited;
            nextQueue = backwardQueue;
        }

        // Explore neighbors of the chosen node
        for (const neighbor of graph[currentNode]) {
            // Intersection Found! The two paths met.
            if (neighbor in targetVisited) {
                return (
                    currentVisited[currentNode] +
                    1 +
                    targetVisited[neighbor]
                );
            }

            if (!(neighbor in currentVisited)) {
                currentVisited[neighbor] = currentVisited[currentNode] + 1;
                nextQueue.push(neighbor);
            }
        }
    }

    return -1; // No path exists
}