"use client"
import {experimental_useOptimistic as useOptimistic} from 'react'

import {BoardColumn} from "@/components/Board/Column";
import {Game} from "@/lib/types";
import {isGameOver} from "@/lib/board";
import {GameStatus} from "@/components/GameStatus";
import {placeMarker} from "@/app/game/[id]/actions";


type BoardProps = {
    id: number,
    game: Game
}

type Action = number

const gameReducer = (state: Game, column: Action) => {
    if (state.winner) {
        console.log('game is over')
        return state
    }

    const x = column
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
};

export const GameBoard = ({id, game: serverGame}: BoardProps) => {
    const [game, placeOptimisticMarker] = useOptimistic(
        serverGame,
        gameReducer,
    )

    console.log('sg', serverGame.currentPlayer)
    console.log('og', game.currentPlayer)


    return (
        <div>
            <div className="inline-grid grid-cols-7">
                {game.board.map((col, x) =>
                    <BoardColumn
                        key={x}
                        index={x}
                        onColumnClick={async () => {
                            placeOptimisticMarker(x)
                            await placeMarker(id, x)
                        }}
                        holes={col}
                        disabled={game.winner !== null}
                    />
                )}
            </div>
            <div className="flex flex-row justify-between">
                <div className="bg-blue-700 w-8 h-36"/>
                <div className="pt-5 font-medium">
                    <GameStatus winner={game.winner} currentPlayer={game.currentPlayer}/>
                </div>
                <div className="bg-blue-700 w-8 h-36"/>
            </div>
        </div>
    );
};
