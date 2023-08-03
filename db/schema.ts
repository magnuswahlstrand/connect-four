import {index, integer, jsonb, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";
import {Board} from "@/lib/board";

export const games = pgTable(
    'games',
    {
        id: serial('id').primaryKey(),
        board: jsonb("value").$type<Board>().notNull(),
        player1: text('player1').notNull().references(() => players.id),
        player2: text('player2').references(() => players.id),
        currentPlayer: integer('current_player').notNull(),
        winner: integer('winner'),
        createdAt: timestamp("created_at", {precision: 6}).defaultNow().notNull(),
        // TODO: Automatically update this?
        updatedAt: timestamp("updated_at", {precision: 6}).defaultNow().notNull(),
    },
    (table) => ({
        player1Idx: index("player1_idx").on(table.player1),
        player2Idx: index("player2_idx").on(table.player2),
    })
);

export const players = pgTable('players', {
        id: text('id').primaryKey(),
        secret: text('secret').notNull(),
        createdAt: timestamp("created_at", {precision: 6}).defaultNow().notNull(),
    },
    (table) => ({
        secretIdx: index("secret_idx").on(table.secret),
    }))