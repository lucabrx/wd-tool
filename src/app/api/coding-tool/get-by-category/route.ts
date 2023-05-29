import { CodingTool } from "@/db/tables/CodingTool"
import { db } from "@/lib/db"
import { desc, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const limit = new URL(request.url).searchParams.get("limit")
    const offset = new URL(request.url).searchParams.get("offset")
    const category = new URL(request.url).searchParams.get("category")

    const codingTools = await db
    .select()
    .from(CodingTool)
    .offset(Number(offset))
    .limit(Number(limit))
    .orderBy(desc(CodingTool.created_at))
    .where(eq(CodingTool.category, category!))

    return NextResponse.json(codingTools)
}