"use server"

import {revalidatePath} from "next/cache";

async function delay(number: number) {
    return new Promise(resolve => setTimeout(resolve, number))
}

export async function placeMarker(data: number) {
    // const index = data.get("columnIndex")
    // if(!index) {
    //     throw new Error("No index")
    // }
    //
    // const columnIndex = parseInt(index.toString())

    // revalidatePath('/game/1')
    await delay(10000)
    console.log("columnIndex", data)
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