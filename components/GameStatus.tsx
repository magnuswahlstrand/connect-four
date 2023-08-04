import {Game} from "@/lib/types";

export function GameStatus({game, playerID}: { game: Game, playerID: string }) {
    switch (game.state) {
        case "new":
            return <div className="text-2xl font-bold">
                Waiting for opponent to join...
            </div>
        case "ongoing":
            return <div className="text-2xl font-bold">
                {game.currentPlayer === playerID ? "Your" : "Your opponent's"} turn.
            </div>
        case "finished":
            return <div className="text-2xl font-bold">
                {game.winner === playerID ? "You" : "Your opponent"} won!
            </div>
    }
}