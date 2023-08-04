import {games, players} from "@/db/schema";
import {and, eq, isNull, ne} from "drizzle-orm";
import {db} from "@/db/index";
import {emptyBoard} from "@/lib/board";
import {Game} from "@/lib/types";

export const newGame = async (idPlayer1: string) => {
    const game = {
        state: "new",
        board: emptyBoard(),
        player1: idPlayer1,
        player2: null,
    } as const
    const [newGame] = await db.insert(games)
        .values(game)
        .returning({id: games.id})
        .execute();
    return newGame.id;
}

export const joinGame = async (idPlayer1: string, idPlayer2: string, gameID: number) => {
    await db.update(games).set(
        {
            state: 'ongoing',
            player2: idPlayer2,
            // Randomize first player
            currentPlayer: Math.random() > 0.5 ? idPlayer1 : idPlayer2,
        }
    ).where(
        and(
            eq(games.state, 'new'),
            isNull(games.player2),
            eq(games.id, gameID),
        )
    ).execute();
}

export const getGame = async (gameID: number) => {
    const [g] = await db.select().from(games).where(eq(games.id, gameID))
    return Game.parse(g)
}

export async function getPlayerBySecret(playerSecret: string | undefined) {
    if (!playerSecret) {
        throw new Error('Player secret missing')
    }

    const [player] = await db.select().from(players).where(eq(players.secret, playerSecret))
    if (!player) {
        throw new Error('Player not found')
    }
    return player
}

export async function getGamesByPlayerSecret(playerSecret: string) {
    const player = await getPlayerBySecret(playerSecret)
    return db.select().from(games).where(eq(games.player1, player.id));
}

export async function getJoinableGames(playerID: string) {
    // TODO: Add index to game state
    return db.select().from(games).where(
        and(
            ne(games.player1, playerID),
            isNull(games.player2),
            eq(games.state, 'new')
        ));
}