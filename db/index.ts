import {drizzle, PostgresJsQueryResultHKT} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {PgTransaction} from "drizzle-orm/pg-core";
import {ExtractTablesWithRelations} from "drizzle-orm";


export const connectionString = process.env.DATABASE_URL ?? ""
console.log(connectionString)
let client = postgres(connectionString);
export const db = drizzle(client);

export type TxType = PgTransaction<PostgresJsQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>

export const dbWithTx = async <T>(fn: (tx: TxType) => Promise<T>): Promise<T> => {
    return await db.transaction(fn, {isolationLevel: "serializable"});
}


