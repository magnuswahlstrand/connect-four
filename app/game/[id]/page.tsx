import {emptyBoard} from "@/lib/board";
import {GameBoard} from "@/components/Board/Board";

function getGame(gameID: string) {
    return {
        board: emptyBoard(),
        currentPlayer: 1,
        winner: null
    };
}

export default function Page({params}: { params: { gameID: string } }) {
    const game = getGame(params.gameID)

    console.log('server rerendered')
    return <div className={"flex flex-col items-center justify-center h-screen cursor-pointer"}>
        <div className="text-2xl font-bold mb-2">Why don&apos;t you</div>
        <div className="text-4xl text-red-600 font-semibold">Connect four?</div>
        <GameBoard game={game}/>
    </div>
}

