import { Favorite } from "@/db/tables/Favorite";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/utils/getSession";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
    toolId: string
}

export async function GET(request: Request, { params }: { params: IParams }) {
    const session = await getCurrentSession() 
    const { toolId } = params

    if (!session) {
        return NextResponse.json({ error: "You must be logged in" })
    }

    const favorite = await db
    .select()
    .from(Favorite)
    .where(and(eq(Favorite.toolId, toolId),eq(Favorite.userId, session.id)))
    .limit(1)
    


    return NextResponse.json(favorite)
}