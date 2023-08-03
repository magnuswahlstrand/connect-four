import {drizzle, PostgresJsQueryResultHKT} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {PgTransaction} from "drizzle-orm/pg-core";
import {eq, ExtractTablesWithRelations} from "drizzle-orm";
import {games} from "@/db/schema";
import {emptyBoard} from "@/lib/board";


export const connectionString = process.env.DATABASE_URL ?? ""
let client = postgres(connectionString);
export const db = drizzle(client);

export type TxType = PgTransaction<PostgresJsQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>

export const dbWithTx = async <T>(fn: (tx: TxType) => Promise<T>): Promise<T> => {
    return await db.transaction(fn, {isolationLevel: "serializable"});
}


export const newGame = async () => {
    const [newGame] = await db.insert(games).values({
        value: {
            board: emptyBoard(),
            currentPlayer: 1,
            winner: null
        }
    }).returning().execute();
    return newGame.id;
}

export const getGame = async (gameID: number) => {
    const [game] = await db.select().from(games).where(eq(games.id, gameID))
    return game.value
}