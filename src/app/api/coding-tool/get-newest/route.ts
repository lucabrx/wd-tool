import { CodingTool } from "@/db/tables/CodingTool"
import { db } from "@/lib/db"
import { desc } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

    const designerTools = await db
    .select()
    .from(CodingTool)
    .limit(5)
    .orderBy(desc(CodingTool.created_at))

    return NextResponse.json(designerTools)
}