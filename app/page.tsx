import {Metadata} from "next";
import {cookies} from 'next/headers'
import {redirect} from "next/navigation";
import {newGameAndRedirect} from "@/app/game/[id]/actions";
import Link from "next/link";
import {getGames} from "@/db/db";


export const metadata: Metadata = {
    title: 'My Page Title',
}

export default async function Page() {
    const cookieStore = cookies()
    const playerID = cookieStore.get('playerID')?.value
    const playerSecret = cookieStore.get('playerSecret')?.value

    if (!playerID || !playerSecret) {
        redirect('/player/new')
    }

    // TODO: Extract to function
    const playerGames = await getGames(playerSecret);


    return <div>
        <div className="text-2xl font-bold mb-2">Player ID: {playerID}</div>
        <div className="text-2xl font-bold mb-2">Player Secret: {playerSecret}</div>
        <h1>Games</h1>
        <div className="flex flex-row gap-8 ">
            {playerGames.map(game =>
                <Link key={game.id} href={"/game/"+game.id} >
                    <div className={"w-48 h-48 bg-pink-300"}>
                        aa
                    </div>
                </Link>
            )}
        </div>


        <form action={newGameAndRedirect}>
            <button type="submit">New Game</button>
        </form>
    </div>

    // const gameID = await newGame(playerID, playerSecret)
    //
    // redirect('/game/' + gameID)
}

