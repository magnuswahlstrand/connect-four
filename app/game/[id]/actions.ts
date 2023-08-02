"use server"

import {revalidatePath} from "next/cache";

async function delay(number: number) {
    return new Promise(resolve => setTimeout(resolve, number))
}

export async function placeMarker(gameId: number, column: number) {
    await delay(1000)
    console.log("columnIndex", column)
    revalidatePath('/game/' + gameId)
}

export async function placeMarker2(data: FormData) {
    const index = data.get("columnIndex")
    if (!index) {
        throw new Error("No index")
    }

    const columnIndex = parseInt(index.toString())

    revalidatePath('/game/1')
    console.log("columnIndex2", columnIndex)
}