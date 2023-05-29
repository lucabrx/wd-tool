import { Favorite } from "@/db/tables/Favorite";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/utils/getSession";
import { and, eq } from "drizzle-orm";
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

     await db
    .delete(Favorite)
    .where(and(eq(Favorite.toolId, toolId),eq(Favorite.userId, session.id)))



    return NextResponse.json({ message: "Favorite added"})
}