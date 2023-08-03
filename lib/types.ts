import {z} from "zod";


export const gameValidation = z.object({
    board: z.array(z.array(z.number())),
    currentPlayer: z.number(),
    winner: z.number().nullable(),
})

export const boardValidation = z.array(z.array(z.number()))

export type Game = z.infer<typeof gameValidation>;
export type Board = z.infer<typeof boardValidation>;

export const pullGameValidation = z.array(z.tuple([z.string(), gameValidation])).min(1).max(1)
