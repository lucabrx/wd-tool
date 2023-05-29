import { CodingTool } from "@/db/tables/CodingTool";
import { Favorite } from "@/db/tables/Favorite";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/utils/getSession";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getCurrentSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await db
    .select()
    .from(Favorite)
    .innerJoin(CodingTool, eq(Favorite.toolId, CodingTool.id))
    .where(eq(Favorite.userId, session.id))
    .orderBy(desc(Favorite.created_at))

    return NextResponse.json(favorites);
}