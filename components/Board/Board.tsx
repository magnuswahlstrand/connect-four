"use client"
import {experimental_useOptimistic as useOptimistic} from 'react'

import {BoardColumn} from "@/components/Board/Column";
import {Game} from "@/lib/types";
import {isGameOver} from "@/lib/board";


type BoardProps = {
    game: Game
}

type Action = { type: 'PLACE_MARKER', column: number }

const gameReducer = (state: Game, action: Action) => {
    switch (action.type) {
        case 'PLACE_MARKER': {
            if (state.winner) {
                console.log('game is over')
                return state
            }

            const x = action.column
            const y = state.board[x].lastIndexOf(0)
            if (y === -1) {
                console.log('invalid move')
                return state
            }

            const copy: number[][] = state.board.map((row: number[]) => Array.from(row));
            copy[x][y] = state.currentPlayer;

            const isOver = isGameOver(copy, x, y, state.currentPlayer)
            return {
                ...state, board: copy,
                winner: isOver ? state.currentPlayer : null,
                currentPlayer: state.currentPlayer === 1 ? 2 : 1
            }
        }
        default:
            return state;
    }
};

export const GameBoard = ({game: serverGame}: BoardProps) => {
    // let [isPending, startTransition] = useTransition()
    // console.log('1', game.winner)
    const [game, placeOptimisticMarker] = useOptimistic(
        serverGame,
        gameReducer,
    )
    const handleClick = (column: number) => {
        console.log('clicked', column)
    }

    console.log('og', game.winner)
    console.log('ag', serverGame.winner)
    // const {board, currentPlayer, winner} = optimisticGame

    const gameIsOver = game.winner !== null
    return (
        <>
            <div>
                <div className="inline-grid grid-cols-7">
                    {game.board.map((col, x) =>
                        <BoardColumn key={x}
                                     index={x}
                                     onClick={() => placeOptimisticMarker({
                                         type: 'PLACE_MARKER',
                                         column: x
                                     })}
                            // onClick={() => console.log('opti clicked')}
                                     holes={col}
                                     disabled={gameIsOver}
                        />
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="bg-blue-700 w-8 h-36"/>
                    <div className="pt-5 font-medium">
                        {!game.winner && `It is ${game.currentPlayer == 1 ? "your" : "your opponent's"} turn.`}
                        {game.winner &&
                            <div className="text-2xl font-bold">{game.winner === 1 ? "You" : "Your opponent"} won!</div>
                        }
                    </div>
                    <div className="bg-blue-700 w-8 h-36"/>
                </div>
            </div>
        </>
    );
};
