import {z} from 'zod';

const NewGame = z.object({
    state: z.literal("new"),
    board: z.array(z.array(z.number())),
    player1: z.string(),
    player2: z.null(),
    currentPlayer: z.null(),
    winner: z.null(),
});

const OngoingGame = z.object({
    state: z.literal("ongoing"),
    board: z.array(z.array(z.number())),
    player1: z.string(),
    player2: z.string(),
    currentPlayer: z.string(),
    winner: z.null(),
});

const FinishedGame = z.object({
    state: z.literal("finished"),
    board: z.array(z.array(z.number())),
    player1: z.string(),
    player2: z.string(),
    currentPlayer: z.null(),
    winner: z.string(),
});

export const Game = z.union([NewGame, OngoingGame, FinishedGame]);

export type Game = z.infer<typeof Game>
export type OngoingGame = z.infer<typeof OngoingGame>
export type FinishedGame = z.infer<typeof FinishedGame>

export type GameStates = Game["state"]
