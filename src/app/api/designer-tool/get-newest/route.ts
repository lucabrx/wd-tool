import { DesignerTool } from "@/db/tables/DesignerTool"
import { db } from "@/lib/db"
import { desc } from "drizzle-orm"
import { NextResponse } from "next/server"

export default async function GET(request: NextResponse) {
    
    const designerTools = await db
    .select()
    .from(DesignerTool)
    .limit(5)
    .orderBy(desc(DesignerTool.created_at))
    
    return NextResponse.json(designerTools)
}