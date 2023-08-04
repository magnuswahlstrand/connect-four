export type Board = number[][];

const BOARD_WIDTH = 7
const BOARD_HEIGHT = 6

type DirectionFunction = (x: number, y: number, i: number) => { x: number, y: number };
const left: DirectionFunction = (x, y, i) => ({x: x - i, y});
const right: DirectionFunction = (x, y, i) => ({x: x + i, y});
const down: DirectionFunction = (x, y, i) => ({x, y: y - i});
const up: DirectionFunction = (x, y, i) => ({x, y: y + i});
const upLeft: DirectionFunction = (x, y, i) => ({x: x - i, y: y + i});
const upRight: DirectionFunction = (x, y, i) => ({x: x + i, y: y + i});
const downLeft: DirectionFunction = (x, y, i) => ({x: x - i, y: y - i});
const downRight: DirectionFunction = (x, y, i) => ({x: x + i, y: y - i});

function count(direction: DirectionFunction, board: number[][], x: number, y: number, currentPlayer: number) {
    let count = 0;
    for (let i = 1; i < 4; i++) {
        const {x: newX, y: newY} = direction(x, y, i);

        if (newX < 0 || newY < 0 || newX >= BOARD_HEIGHT || newY >= BOARD_WIDTH || board[newX][newY] !== currentPlayer) {
            break;
        }
        count++;
    }
    return count;
}

function countHorizontal(board: number[][], x: number, y: number, currentPlayer: number) {
    return 1 + count(left, board, x, y, currentPlayer) + count(right, board, x, y, currentPlayer);
}

function countVertical(board: number[][], x: number, y: number, currentPlayer: number) {
    return 1 + count(down, board, x, y, currentPlayer) + count(up, board, x, y, currentPlayer);
}

function countDiagonalDescending(board: number[][], x: number, y: number, currentPlayer: number) {
    return 1 + count(upLeft, board, x, y, currentPlayer) + count(downRight, board, x, y, currentPlayer);
}

function countDiagonalAscending(board: number[][], x: number, y: number, currentPlayer: number) {
    return 1 + count(upRight, board, x, y, currentPlayer) + count(downLeft, board, x, y, currentPlayer);
}

export const isGameFinished = (board: Board, x: number, y: number, currentPlayer: number): boolean => {
    if (countHorizontal(board, x, y, currentPlayer) >= 4) {
        return true
    }

    if (countVertical(board, x, y, currentPlayer) >= 4) {
        return true
    }

    if (countDiagonalDescending(board, x, y, currentPlayer) >= 4) {
        return true
    }

    if (countDiagonalAscending(board, x, y, currentPlayer) >= 4) {
        return true
    }

    return false
}

export const emptyBoard = (): Board => {
    return [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ]
}

if (import.meta.vitest) {

    const TEST_BOARD = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ]

    const {it, expect, describe,} = import.meta.vitest

    describe('board', () => {

        it('count left ', () => {
            let res: number
            res = count(left, TEST_BOARD, 0, 1, 1)
            expect(res).eq(0)
            res = count(left, TEST_BOARD, 1, 1, 1)
            expect(res).eq(0)
            res = count(left, TEST_BOARD, 4, 1, 1)
            expect(res).eq(3)
        })

        it('count right ', () => {
            let res: number
            res = count(right, TEST_BOARD, 1, 1, 1)
            expect(res).eq(3)
            res = count(right, TEST_BOARD, 4, 1, 1)
            expect(res).eq(0)
        })

        it('count down', () => {
            let res: number
            res = count(down, TEST_BOARD, 1, 1, 1)
            expect(res).eq(0)
            res = count(down, TEST_BOARD, 1, 4, 1)
            expect(res).eq(3)
        })

        it('count up and left', () => {
            let res: number
            res = count(upLeft, TEST_BOARD, 4, 1, 1)
            expect(res).eq(3)
            res = count(upLeft, TEST_BOARD, 1, 4, 1)
            expect(res).eq(0)
        })

        it('count down and right', () => {
            let res: number
            res = count(downRight, TEST_BOARD, 4, 1, 1)
            expect(res).eq(0)
            res = count(downRight, TEST_BOARD, 1, 4, 1)
            expect(res).eq(3)
        })


        it('count up and right', () => {
            let res: number
            res = count(upRight, TEST_BOARD, 1, 1, 1)
            expect(res).eq(3)
            res = count(upRight, TEST_BOARD, 4, 4, 1)
            expect(res).eq(0)
        })

        it('count down and left', () => {
            let res: number
            res = count(downLeft, TEST_BOARD, 1, 1, 1)
            expect(res).eq(0)
            res = count(downLeft, TEST_BOARD, 4, 4, 1)
            expect(res).eq(3)
        })

        it('count horizontal', () => {
            const res = countHorizontal(TEST_BOARD, 2, 1, 1)
            expect(res).eq(4)
        })
        it('count vertical', () => {
            const res = countVertical(TEST_BOARD, 1, 2, 1)
            expect(res).eq(4)
        })
        it('count diagonal ascending', () => {
            const res = countDiagonalAscending(TEST_BOARD, 1, 1, 1)
            expect(res).eq(4)
        })
        it('count diagonal descending', () => {
            const res = countDiagonalDescending(TEST_BOARD, 1, 4, 1)
            expect(res).eq(4)
        })

        it('game on empty board is not over ', () => {
            const res = isGameFinished(emptyBoard(), 1, 1, 1)
            expect(res).eq(false)
        })

        it('game is over ', () => {
            const res = isGameFinished(TEST_BOARD, 1, 1, 1)
            expect(res).eq(true)
        })
    })
}