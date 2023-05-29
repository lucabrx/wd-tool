import { Favorite } from "@/db/tables/Favorite";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/utils/getSession";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

interface Body {
    toolId: string
}

export async function POST(request: Request) {
    const session = await getCurrentSession()
    const body:Body = await request.json()
    const { toolId } = body
    

    if (!session) {
        return NextResponse.json({ error: "You must be logged in" })
    }

    const favorite = await db
    .insert(Favorite)
    .values({
        id: nanoid(),
        userId: session.id,
        toolId
    })


    return NextResponse.json({ message: "Favorite added"})
}