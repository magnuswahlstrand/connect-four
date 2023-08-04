"use server"

import {revalidatePath} from "next/cache";
import {gameReducer} from "@/lib/game-logic";
import {getGame, getPlayerBySecret, joinGame, newGame} from "@/db/db";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {db} from "@/db";
import {games} from "@/db/schema";
import {eq} from "drizzle-orm";
import {Game} from "@/lib/types";

export async function placeMarker(gameId: number, column: number) {
    const cookieStore = cookies()
    const playerSecret = cookieStore.get('playerSecret')?.value
    const player = await getPlayerBySecret(playerSecret)
    const g = await getGame(gameId)
    const oldGame = Game.parse(g)

    // TODO: Move into reducer
    if (oldGame.currentPlayer === player.id) {
        console.log('Not users turn, should not happen')
        const newGame = gameReducer(oldGame, column)
        await db.update(games).set({
            ...newGame,
        }).where(eq(games.id, gameId)).execute()
    }

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


export async function joinGameAndRedirect(existingPlayer: string, gameID: number) {
    const cookieStore = cookies()
    const playerID = cookieStore.get('playerID')?.value
    const playerSecret = cookieStore.get('playerSecret')?.value
    if (!playerID || !playerSecret) {
        // TODO: What to do here?
        redirect('/')
    }

    // TODO: Check validate player first?
    await joinGame(existingPlayer, playerID, gameID)
    redirect('/game/' + gameID)
    revalidatePath('/')
}