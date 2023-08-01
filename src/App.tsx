import {useReducer, useState} from "react";
import {Board} from "./types.ts";
import cx from "classnames";
import {ChevronDown} from 'lucide-react';


const newGame = () => {
    return {
        currentPlayer: 1,
        board: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 2],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ]
    }
};


type BoardProps = {
    currentPlayer: number
    board: Board
    onClick: (column: number) => void
}

function BoardHole({player}: { player: number }) {
    return <div className="h-32 w-32 flex items-center justify-center">
        <div className={cx(
            "h-24 w-24 rounded-full border-2 border-t-4 border-black",
            {"bg-white": player === 0},
            {"bg-red-500": player === 1},
            {"bg-yellow-400": player === 2}
        )}/>
    </div>;
}


function BoardColumn({onClick, holes}: { currentPlayer: number, onClick: () => void, holes: number[] }) {
    const [hovered, setHovered] = useState(false)

    const hasEmptyHole = holes.some((cell) => cell === 0)
    const handleClick = hasEmptyHole ? onClick : () => {}


    return <div
        className={cx(
            {"bg-blue-600": hovered},
            {"bg-blue-700": !hovered}
        )}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}>
        <div className="bg-white">
            <ChevronDown size={72} className={cx(
                "mx-auto text-blue-800", {
                    "opacity-0": !(hovered && hasEmptyHole),
                })}/>
        </div>
        {holes.map((cell, y) =>
            <BoardHole key={y} player={cell}/>
        )}</div>
}


const GameBoard = ({board, onClick, currentPlayer}: BoardProps) => {
    return (
        <>
            <div>
                <div className="inline-grid grid-cols-7">
                    {board.map((col, x) =>
                        <BoardColumn key={x}
                                     currentPlayer={currentPlayer}
                                     onClick={() => onClick(x)} holes={col}/>
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="bg-blue-700 w-8 h-36"/>
                    <div className="pt-5 font-medium">It is {currentPlayer == 1? "your" : "your opponent's"} turn.</div>
                    <div className="bg-blue-700 w-8 h-36"/>
                </div>
            </div>
        </>
    );
};

interface State {
    board: Board;
    currentPlayer: number;
}

type Action = { type: 'PLACE_MARKER', column: number }

const gameReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'PLACE_MARKER': {
            const y = state.board[action.column].lastIndexOf(0)
            if (y === -1) {
                console.log('invalid move')
                return state
            }

            const newBoard = state.board.map((col, x) => {
                if (x === action.column) {
                    return [...col.slice(0, y), state.currentPlayer, ...col.slice(y + 1)]
                } else {
                    return col
                }
            })
            return {
                ...state, board: newBoard,
                currentPlayer: state.currentPlayer === 1 ? 2 : 1
            }
        }
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(gameReducer, newGame());

    // Destructure state for ease of use
    const {board, currentPlayer} = state;


    const handleClick = (column: number) => {
        dispatch({type: 'PLACE_MARKER', column});
    };

    return (
        <>
            <div className={"flex flex-col items-center justify-center h-screen cursor-pointer"}>
                <div className="text-2xl font-bold mb-2">Why don't you</div>
                <div className="text-4xl text-red-600 font-semibold">Connect four?</div>
                <GameBoard board={board} onClick={handleClick} currentPlayer={currentPlayer}/>
            </div>
        </>
    )
}

export default App
