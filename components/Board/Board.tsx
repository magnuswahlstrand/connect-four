"use client"
import {experimental_useOptimistic as useOptimistic} from 'react'

import {BoardColumn} from "@/components/Board/Column";
import {Game} from "@/lib/types";
import {GameStatus} from "@/components/GameStatus";
import {placeMarker} from "@/app/game/[id]/actions";
import {gameReducer} from "@/lib/game-logic";


type BoardProps = {
    id: number,
    game: Game
}

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
