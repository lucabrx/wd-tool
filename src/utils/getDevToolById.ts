import { CodingTool } from "@/db/tables/CodingTool"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"

export async function getDevToolById(toolId: string) {

    if(!toolId) return null
    
    const tools = await db
    .select()
    .from(CodingTool)
    .where(eq(CodingTool.id, toolId))


    if(tools.length === 0) return null

    return tools[0]
}