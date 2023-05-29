import { DesignerTool } from "@/db/tables/DesignerTool"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"

export async function getUiToolById(toolId: string) {

    if(!toolId) return null
    
    const tools = await db
    .select()
    .from(DesignerTool)
    .where(eq(DesignerTool.id, toolId))


    if(tools.length === 0) return null

    return tools[0]
}