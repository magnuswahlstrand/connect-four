import {jsonb, pgTable, serial} from "drizzle-orm/pg-core";
import {Game} from "@/lib/types";


export const games = pgTable('games', {
    id: serial('id').primaryKey(),
    value: jsonb("value").$type<Game>().notNull(),
});