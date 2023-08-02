import {Metadata} from "next";
import {emptyBoard} from "@/lib/board";
import {GameBoard} from "@/components/Board/Board";

export const metadata: Metadata = {
    title: 'My Page Title',
}

export default function Page() {
    const game = {
        board: emptyBoard(),
        currentPlayer: 1,
        winner: null
    }

    return <div className={"flex flex-col items-center justify-center h-screen cursor-pointer"}>
        <div className="text-2xl font-bold mb-2">Why don&apos;t you</div>
        <div className="text-4xl text-red-600 font-semibold">Connect four?</div>
        FOO
    </div>
}

