"use client"
import {experimental_useOptimistic as useOptimistic, useTransition} from 'react'

import {BoardColumn} from "@/components/Board/Column";
import {Game} from "@/lib/types";


type BoardProps = {
    game: Game
}


export const GameBoard = ({game}: BoardProps) => {
    let [isPending, startTransition] = useTransition()
    console.log('1', game.winner)
    const [optimisticGame, placeOptimisticMarker] = useOptimistic(
        game,
        (state, newMessage) => (
            {
                ...state,
                winner: 1
            }),
    )
    const handleClick = (column: number) => {
        console.log('clicked', column)
    }

    console.log('2', optimisticGame.winner)
    // const {board, currentPlayer, winner} = optimisticGame

    const gameIsOver = optimisticGame.winner !== null
    return (
        <>
            <div>
                <div className="inline-grid grid-cols-7">
                    {optimisticGame.board.map((col, x) =>
                        <BoardColumn key={x}
                                     index={x}
                            //          onClick={() => placeOptimisticMarker('foo')}
                                     onClick={() => console.log('opti clicked')}
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
