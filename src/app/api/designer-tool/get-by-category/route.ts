import { DesignerTool } from "@/db/tables/DesignerTool"
import { db } from "@/lib/db"
import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export default async function GET(request: NextResponse) {
    const limit = new URL(request.url).searchParams.get("limit")
    const offset = new URL(request.url).searchParams.get("offset")
    const category = new URL(request.url).searchParams.get("category")

   if(!category) {
        return NextResponse.json({message: "Category is required"})
    }
    
    const designerTools = await db
    .select()
    .from(DesignerTool)
    .offset(Number(offset))
    .limit(Number(limit))
    .orderBy(desc(DesignerTool.created_at))
    .where(eq(DesignerTool.category, category))


    return NextResponse.json(designerTools)
}