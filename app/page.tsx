import {Metadata} from "next";
import {cookies} from 'next/headers'
import {redirect} from "next/navigation";
import {joinGameAndRedirect, newGameAndRedirect} from "@/app/game/[id]/actions";
import Link from "next/link";
import {getGamesByPlayerSecret, getJoinableGames} from "@/db/db";


export const metadata: Metadata = {
    title: 'My Page Title',
}

const JoinableGame = ({existingPlayer, id}: { existingPlayer: string, id: number }) => {
    const joinGame = async () => {
        "use server"
        await joinGameAndRedirect(existingPlayer, id)
    }

    return (
        <form action={joinGame}>
            <div className={"w-48 h-48 bg-blue-300 flex flex-col"} key={id}>
                <div>id: {id}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">Join
                </button>
            </div>
        </form>
    )
}


export default async function Page() {
    const cookieStore = cookies()
    const playerID = cookieStore.get('playerID')?.value
    const playerSecret = cookieStore.get('playerSecret')?.value
    if (!playerID || !playerSecret) {
        redirect('/player/new')
    }

    const playerGames = await getGamesByPlayerSecret(playerSecret);
    const joinableGames = await getJoinableGames(playerID);


    return <div>
        <div className="text-2xl font-bold mb-2">Player ID: {playerID}</div>
        <div className="text-2xl font-bold mb-2">Player Secret: {playerSecret}</div>
        <h1>Your Games</h1>
        <div className="flex flex-row gap-8 ">
            {playerGames.map(game =>
                <Link key={game.id} href={"/game/" + game.id}>
                    <div className={"w-48 h-48 bg-pink-300 flex flex-col"}>
                        <div>id: {game.id}</div>
                        <div>player1: {game.player1}</div>
                        <div>player2: {game.player2}</div>
                    </div>
                </Link>
            )}
        </div>
        <h1>Join</h1>
        <div className="flex flex-row gap-8 ">
            {joinableGames.map(game => <JoinableGame existingPlayer={game.player1} id={game.id}/>)}
        </div>


        <form action={newGameAndRedirect}>
            <button type="submit">New Game</button>
        </form>
    </div>

    // const gameID = await newGame(playerID, playerSecret)
    //
    // redirect('/game/' + gameID)
}

