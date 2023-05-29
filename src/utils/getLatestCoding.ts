import { CodingTool } from "@/db/tables/CodingTool";
import { db } from "@/lib/db";
import { desc } from "drizzle-orm";

export async function getLatestCoding() {

    const tools = await db
    .select()
    .from(CodingTool)
    .limit(3)
    .orderBy(desc(CodingTool.created_at))

    return tools
}