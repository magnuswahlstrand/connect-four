import {games, players} from "@/db/schema";
import {eq} from "drizzle-orm";
import {db} from "@/db/index";
import {emptyBoard} from "@/lib/board";

export const newGame = async (idPlayer1: string) => {
    const game = {
        board: emptyBoard(),
        player1: idPlayer1,
        player2: null,
        currentPlayer: Math.floor(Math.random() * 2) + 1,
    }
    const [newGame] = await db.insert(games)
        .values(game)
        .returning({id: games.id})
        .execute();
    return newGame.id;
}

export const getGame = async (gameID: number) => {
    const [game] = await db.select().from(games).where(eq(games.id, gameID))
    return game
}

export async function getGames(playerSecret: string) {
    const [player] = await db.select().from(players).where(eq(players.secret, playerSecret))
    if (!player) {
        throw new Error('Player not found')
    }
    return db.select().from(games).where(eq(games.player1, player.id));
}