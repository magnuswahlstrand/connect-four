"use server"

async function delay(number: number) {
    return new Promise(resolve => setTimeout(resolve, number))
}

export async function send(data: number) {
    // const index = data.get("columnIndex")
    // if(!index) {
    //     throw new Error("No index")
    // }
    //
    // const columnIndex = parseInt(index.toString())

    await delay(2000)
    console.log("columnIndex", data)
}