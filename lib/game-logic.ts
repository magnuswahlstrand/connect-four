import {FinishedGame, Game, OngoingGame} from "@/lib/types";
import {isGameFinished} from "@/lib/board";
// TODO: Refactor file

export const gameReducer = (game: Game, column: number) => {
    if (game.state !== 'ongoing') {
        console.log(`game is in state ${game.state}, ignoring move`)
        return game
    }

    const x = column
    const y = game.board[x].lastIndexOf(0)
    if (y === -1) {
        console.log('invalid move')
        return game
    }

    const copy: number[][] = game.board.map((row: number[]) => Array.from(row));
    const playerNumber = game.currentPlayer === game.player1 ? 1 : 2;
    console.log(game.currentPlayer, game.player1)
    console.log(`player ${playerNumber} moved to ${x},${y}`)
    copy[x][y] = playerNumber

    console.log("before",
        {
            playerNumber: playerNumber,
            currentPlayer: game.currentPlayer,
            player1: game.player1,
            player2: game.player2,
        })


    const isOver = isGameFinished(copy, x, y, playerNumber)
    if (isOver) {
        const g: FinishedGame = {
            ...game,
            state: 'finished',
            board: copy,
            winner: game.currentPlayer,
            currentPlayer: null,
        }
        return g
    } else {
        const nextPlayer = playerNumber === 1 ? game.player2 : game.player1
        const g: OngoingGame = {
            ...game,
            board: copy,
            currentPlayer: nextPlayer
        }
        console.log("after",
            {
                currentPlayer: g.currentPlayer,
                player1: g.player1,
                player2: g.player2,
            })
        return g
    }
}
