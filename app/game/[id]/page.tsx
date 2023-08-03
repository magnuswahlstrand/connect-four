import {GameBoard} from "@/components/Board/Board";

import {getGame} from "@/db/db";

export default async function Page({params}: { params: { id: string } }) {
    const gameID = parseInt(params.id)
    if (isNaN(gameID)) {
        // TODO: return 404?
        return <div>Invalid game ID</div>
    }

    const game = await getGame(gameID)
    if(!game) {
        // TODO: return 404?
        return <div>Game not found</div>
    }

    return <div className={"flex flex-col items-center justify-center pt-4"}>
        <div className="text-2xl font-bold mb-2">Why don&apos;t you</div>
        <div className="text-4xl text-red-600 font-semibold">Connect four?</div>
        <GameBoard game={game} id={gameID}/>
    </div>
}

