import {Game} from "@/lib/types";
import {isGameOver} from "@/lib/board";

const isAllowedMove = (game: Game, column: number) => {
    if (game.winner) {
        console.log('game is over')
        return false
    }

    if (y === -1) {
        console.log('invalid move')
        return false
    }
    return true
}

export const foo = (game: Game, column: number) => {
    if (game.winner) {
        console.log('game is over')
        return {game, updated: false}
    }

    const x = column
    const y = game.board[x].lastIndexOf(0)
    if (y === -1) {
        console.log('invalid move')
        return {game, updated: false}
    }

    const copy: number[][] = game.board.map((row: number[]) => Array.from(row));
    copy[x][y] = game.currentPlayer;

    const isOver = isGameOver(copy, x, y, game.currentPlayer)
    return {
        game: {
            board: copy,
            winner: isOver ? game.currentPlayer : null,
            currentPlayer: game.currentPlayer === 1 ? 2 : 1
        },
        updated: true
    }
}


export const gameReducer = (state: Game, column: number) => {
    const {game} = foo(state, column)
    return game
    // const x = column
    // const y = game.board[x].lastIndexOf(0)
    //
    // if (game.winner) {
    //     console.log('game is over')
    //     return game
    // }
    //
    // const x = column
    // const y = game.board[x].lastIndexOf(0)
    // if (y === -1) {
    //     console.log('invalid move')
    //     return game
    // }
    //
    // const copy: number[][] = game.board.map((row: number[]) => Array.from(row));
    // copy[x][y] = game.currentPlayer;
    //
    // const isOver = isGameOver(copy, x, y, game.currentPlayer)
    // return {
    //     board: copy,
    //     winner: isOver ? game.currentPlayer : null,
    //     currentPlayer: game.currentPlayer === 1 ? 2 : 1
    // }
};