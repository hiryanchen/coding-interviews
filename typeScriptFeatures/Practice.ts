// Array
const lg = console.log
const arr:number[] = [1, 2, 3];

const helloArr:Array<string> = Array.from('hello');
// lg(helloArr);

// Map
let tennisPlayers: Map<string, string> = new Map([
  ['Novak Djokovic', 'Serbia'],
  ['Rafael Nadal', 'Spain'],
  ['Roger Federer', 'Switzerland']
]);
tennisPlayers.set('Learner Tien', 'USA');
const playerNames = Array.from(tennisPlayers.keys());
// or
// const playerNames = [...tennisPlayers.keys()];

// lg(playerNames);

// Promise
// if you just do computeWinnr: Promise<string> = new Promise() it will always
// be the same promise without new one, so you need to create a new Promise
// each time
function computeWinner(): Promise<string> {
    return new Promise(
        (resolve, reject) => {
            // Math.random * (Max - Min) + Min
            const rand:number = Math.floor(Math.random() * playerNames.length);
            setTimeout(() => {
                // Pick a winner
                resolve(playerNames[rand] + ' Won!');
        }, 1000);
    }
  );
}

// computeWinner().then((result) => {
//     lg(result);
// });

async function getWinner() {
    try {
        const winner = await computeWinner();
        lg(winner);
    } catch (error) {
        lg('Error occurred:', error);
    }
}

// Concurrent Map
async function concurrentMap<T, R>(arr: T[],
    limit: number,
    fn: (item: T) => Promise<R>): Promise<R[]> {
    let i:number = 0;
    let results:R[] = new Array(arr.length);
    
    // Create worker pool
    const workers:Promise<void>[] = Array.from({length: limit}, async ():Promise<void> => {
      while (i < arr.length) {
        const index = i++;
        results[index] = await fn(arr[index]);
      }
    });

    // Await all workers
    await Promise.all(workers);
    return results;
}

lg(concurrentMap(playerNames, 3, (name) => getWinner()));
