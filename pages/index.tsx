import {Inter} from 'next/font/google'
import {useReducer} from "react";
import {BoardColumn} from "@/components/Board/Column";
import {Board, emptyBoard, isGameOver} from "@/lib/board";

const inter = Inter({subsets: ['latin']})


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

            const newBoard = state.board.map((col, index) => {
                if (index === x) {
                    return [...col.slice(0, y), state.currentPlayer, ...col.slice(y + 1)]
                } else {
                    return col
                }
            })

            const isOver = isGameOver(newBoard, x, y, state.currentPlayer)
            return {
                ...state, board: newBoard,
                winner: isOver ? state.currentPlayer : null,
                currentPlayer: state.currentPlayer === 1 ? 2 : 1
            }
        }
        default:
            return state;
    }
};

export default function Home() {
    const [state, dispatch] = useReducer(gameReducer, newGame());

    // Destructure state for ease of use
    const {board, currentPlayer, winner} = state;


    const handleClick = (column: number) => {
        dispatch({type: 'PLACE_MARKER', column});
    };

    return (
        <>
            <div className={"flex flex-col items-center justify-center h-screen cursor-pointer"}>
                <div className="text-2xl font-bold mb-2">Why don&apos;t you</div>
                <div className="text-4xl text-red-600 font-semibold">Connect four?</div>
                <GameBoard board={board} onClick={handleClick} currentPlayer={currentPlayer} winner={winner}/>
            </div>
        </>
    )
}
