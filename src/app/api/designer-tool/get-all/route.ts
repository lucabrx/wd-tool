import { DesignerTool } from "@/db/tables/DesignerTool"
import { db } from "@/lib/db"
import { getCurrentSession } from "@/utils/getSession"
import { asc } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export  async function GET(request: NextRequest) {
    const session = await getCurrentSession()
    const limit = new URL(request.url).searchParams.get("limit")
    const offset = new URL(request.url).searchParams.get("offset")

    if(!session) {
        return new Response("Unauthorized", { status: 401 })
    }
    if(session.role !== "admin") {
        return new Response("Unauthorized", { status: 401 })
    }

    const designerTools = await db
    .select()
    .from(DesignerTool)
    .offset(Number(offset))
    .limit(Number(limit))
    .orderBy(asc(DesignerTool.category))

    return NextResponse.json(designerTools)
}