import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {db} from "@/db";
import {players} from "@/db/schema";

export async function GET(request: NextRequest) {
    const cookieStore = cookies()
    const playerID = cookieStore.get('playerID')?.value
    const playerSecret = cookieStore.get('playerSecret')?.value

    if (!playerID || !playerSecret) {
        const playerID = "user-" + crypto.randomUUID()
        const playerSecret = "secret-" + crypto.randomUUID()
        await db.insert(players).values({
            id: playerID,
            secret: playerSecret
        })
        const opt = {
            secure: true,
            maxAge: 3600 * 24 * 400, // After 400 days you need a new profile
            httpOnly: true,
            sameSite: true,
        }
        cookies().set('playerID', playerID, opt)
        cookies().set('playerSecret', playerSecret, opt)
    }

    return NextResponse.redirect(request.nextUrl.origin)
}