import {NextApiRequest, NextApiResponse} from "next";
import {emptyBoard} from "@/lib/board";

export default async function handlePull(req: NextApiRequest, res: NextApiResponse) {
    res.send({
        board: emptyBoard(),
        currentPlayer: 1,
        winner: null
    })
}