import {Metadata} from "next";
import {emptyBoard} from "@/lib/board";
import {redirect} from "next/navigation";
import {games} from "@/db/schema";
import {db, newGame} from "@/db";

export const metadata: Metadata = {
    title: 'My Page Title',
}

export default async function Page() {
    const gameID = await newGame()

    redirect('/game/' + gameID)
}

