"use server"

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

    await delay(1000)
    console.log("columnIndex", data)
}