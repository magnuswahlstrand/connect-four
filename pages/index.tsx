import {Inter} from 'next/font/google'
import {BoardColumn} from "@/components/Board/Column";
import {Board, emptyBoard, isGameOver} from "@/lib/board";
import {Replicache, WriteTransaction} from "replicache";
import {Game, pullGameValidation} from "@/lib/types";
import {useSubscribe} from "replicache-react";

const inter = Inter({subsets: ['latin']})

const REPLICACHE_LICENSE_KEY = process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY ?? ""

const newGame = () => {
    return {
        board: emptyBoard(),
        currentPlayer: 1,
        winner: null
    }
};


type BoardProps = {
    board: Board
    onClick: (column: number) => void
    currentPlayer: number
    winner: number | null
}


const GameBoard = ({board, onClick, currentPlayer, winner}: BoardProps) => {
    return (
        <>
            <div>
                <div className="inline-grid grid-cols-7">
                    {board.map((col, x) =>
                        <BoardColumn key={x}
                                     onClick={() => onClick(x)}
                                     holes={col}
                                     disabled={winner !== null}
                        />
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="bg-blue-700 w-8 h-36"/>
                    <div className="pt-5 font-medium">
                        {!winner && `It is ${currentPlayer == 1 ? "your" : "your opponent's"} turn.`}
                        {winner &&
                            <div className="text-2xl font-bold">{winner === 1 ? "You" : "Your opponent"} won!</div>
                        }
                    </div>
                    <div className="bg-blue-700 w-8 h-36"/>
                </div>
            </div>
        </>
    );
};

interface State {
    board: Board;
    currentPlayer: number;
    winner: number | null;
}

type Action = { type: 'PLACE_MARKER', column: number }

const gameReducer = (state: State, action: Action) => {
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

type GameUpdate = {
    gameId: string,
    game: Game,
    column: number
}

const placeMarker = async (tx: WriteTransaction, {gameId, game, column}: GameUpdate) => {

    if (game.winner) {
        console.log('game is over')
        return
    }

    const x = column
    const y = game.board[x].lastIndexOf(0)
    if (y === -1) {
        console.log('invalid move')
        return
    }

    const copy: number[][] = game.board.map((row: number[]) => Array.from(row));
    copy[x][y] = game.currentPlayer;

    const isOver = isGameOver(copy, x, y, game.currentPlayer)

    const updatedGame = {
        currentPlayer: game.currentPlayer === 1 ? 2 : 1,
        board: copy,
        winner: isOver ? game.currentPlayer : null,
    }
    await tx.put(`game/${gameId}`, updatedGame);
    console.log('message put')
}

const mutators = {
    placeMarker
}

const r = process.browser
    ? new Replicache({
        name: "MAGNUS",
        licenseKey: REPLICACHE_LICENSE_KEY,
        pushURL: '/api/replicache-push',
        pullURL: '/api/replicache-pull',
        mutators,
    }) : null

export default function Home() {
    const games = useSubscribe(
        r,
        async tx => {
            // TODO: Remove game hardcoding
            const list = await tx.scan({prefix: 'game/qpdgkvpb9ao'}).entries().toArray()
            return pullGameValidation.parse(list)
        },
        [],
    );

    if (games.length === 0) {
        return <div>loading...</div>
    }

    const [gameId, game] = games[0];

    const handleClick = async (column: number) => {
        await r?.mutate.placeMarker({gameId: gameId.substring(5), game, column})
    };

    return (
        <>
            <div className={"flex flex-col items-center justify-center h-screen cursor-pointer"}>
                <div className="text-2xl font-bold mb-2">Why don&apos;t you</div>
                <div className="text-4xl text-red-600 font-semibold">Connect four?</div>
                <GameBoard board={game.board}
                           onClick={handleClick}
                           currentPlayer={game.currentPlayer} winner={game.winner}/>
            </div>
        </>
    )
}
