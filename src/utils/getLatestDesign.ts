import { DesignerTool } from "@/db/tables/DesignerTool";
import { db } from "@/lib/db";
import { desc } from "drizzle-orm";

export async function getLatestDesign() {

    const tools = await db
    .select()
    .from(DesignerTool)
    .limit(3)
    .orderBy(desc(DesignerTool.created_at))

    return tools
}