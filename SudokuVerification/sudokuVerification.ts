/**
 * Function to verify if a given Sudoku board is valid.
 * A valid Sudoku board (partially filled) must satisfy the following rules:    
 * 1. Each row must contain the digits 1-9 without repetition.
 * 2. Each column must contain the digits 1-9 without repetition.
 * 3. Each of the nine 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 *   
 * returns true if the board is valid, otherwise returns false.
 * 
 * @param board - A 9x9 2D array representing the Sudoku board.
 * @returns boolean - true if the board is valid, false otherwise.
 */

function isValidSudoku(board: number[][]): boolean {
    const rows: Set<number>[] = Array.from({ length: 9 }, () => new Set());
    const cols: Set<number>[] = Array.from({ length: 9 }, () => new Set());
    const boxes: Set<number>[] = Array.from({ length: 9 }, () => new Set());

    for (let row:number = 0; row < 9; row++) {
        for (let col:number = 0; col < 9; col++) {
            const num = board[row][col];
            if (num !== 0) { // Assuming 0 represents an empty cell
                const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
                if (rows[row].has(num) || cols[col].has(num) || boxes[boxIndex].has(num)) {
                    return false;
                }
                rows[row].add(num);
                cols[col].add(num);
                boxes[boxIndex].add(num);
            }
        }
    }
    return true;
}

// Example usage:
const board: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
console.log(isValidSudoku(board)); // true