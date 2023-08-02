import {jsonb, pgTable, serial} from "drizzle-orm/pg-core";
import {Game} from "@/lib/types";


// export const spaces = pgTable('space', {
//     key: text("key").primaryKey(),
//     version: integer("version").notNull(),
// })
//
// export const replicacheClients = pgTable('replicache_client', {
//     id: text("id").primaryKey(),
//     last_mutation_id: integer("last_mutation_id").notNull()
// })
//
//
// export const entry = pgTable('entry', {
//     key: text("key").primaryKey(),
//     spaceid: text("spaceid").notNull().references(() => spaces.key),
//     value: jsonb("value").$type<Game>().notNull(),
//     deleted: boolean("deleted").notNull(),
//     version: integer("version").notNull(),
//     lastmodified: timestamp("version", {precision: 6}).notNull(),
// });

export const games = pgTable('games', {
    id: serial('id').primaryKey(),
    value: jsonb("value").$type<Game>().notNull(),
});