"use server"

import {revalidatePath} from "next/cache";
import {gameReducer} from "@/lib/game-logic";
import {getGame, newGame} from "@/db/db";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {db} from "@/db";
import {games} from "@/db/schema";
import {eq} from "drizzle-orm";


export async function placeMarker(gameId: number, column: number) {
    const oldGame = await getGame(gameId)
    const newGame = gameReducer(oldGame, column)
    await db.update(games).set({
        board: newGame.board,
        currentPlayer: newGame.currentPlayer,
        winner: newGame.winner,
    }).where(eq(games.id, gameId)).execute()

    revalidatePath('/game/' + gameId)
}

export async function newGameAndRedirect() {
    const cookieStore = cookies()
    const playerID = cookieStore.get('playerID')?.value
    const playerSecret = cookieStore.get('playerSecret')?.value
    if (!playerID || !playerSecret) {
        // TODO: What to do here?
        redirect('/')
    }

    // TODO: Check validate player first?
    const gameID = await newGame(playerID)
    redirect('/game/' + gameID)
    revalidatePath('/')
}