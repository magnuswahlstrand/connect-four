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
    playerID: string
}

export const GameBoard = ({playerID, id, game: serverGame}: BoardProps) => {
    const [game, placeOptimisticMarker] = useOptimistic(
        serverGame,
        gameReducer,
    )

    return (
        <div>
            <div className="inline-grid grid-cols-7">
                {game.board.map((col, x) =>
                    <BoardColumn
                        key={x}
                        index={x}
                        onColumnClick={async () => {
                            placeOptimisticMarker({playerID, column: x})
                            await placeMarker(id, x)
                        }}
                        holes={col}
                        disabled={game.winner !== null}
                    />
                )}
            </div>
            <div className="flex flex-row justify-between">
                <div className="bg-blue-700 w-8 h-16"/>
                <div className="pt-5 font-medium">
                    <GameStatus game={game} playerID={playerID}/>
                </div>
                <div className="bg-blue-700 w-8 h-16"/>
            </div>
        </div>
    );
};
