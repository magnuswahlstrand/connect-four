"use server"

import {revalidatePath} from "next/cache";
import {db, getGame} from "@/db";
import {gameReducer} from "@/lib/game-logic";
import {eq} from "drizzle-orm";
import {games} from "@/db/schema";


export async function placeMarker(gameId: number, column: number) {
    const oldGame = await getGame(gameId)
    const newGame = gameReducer(oldGame, column)
    await db.update(games).set({value: newGame}).where(eq(games.id, gameId)).execute()

    revalidatePath('/game/' + gameId)
}
