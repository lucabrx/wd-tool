import { CodingTool } from "@/db/tables/CodingTool";
import { db } from "@/lib/db";
import { UpdateCodingToolType } from "@/schema/coding-tool.schema";
import { getCurrentSession } from "@/utils/getSession";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
    toolId?: string;
  }

  export async function DELETE(request: Request, { params }: { params: IParams }) {
    const session = await getCurrentSession();
    const {toolId} = params 
    if(!toolId) {
        return NextResponse.json({error: "No toolId provided"})
    }
    if (!session) {
    return NextResponse.json({error: "Unauthorized"})
    }
    if(session.role !== "admin") {
        return NextResponse.json({error: "Unauthorized"})
    }

     await db 
    .delete(CodingTool)
    .where(eq(CodingTool.id, toolId))
  

    return NextResponse.json({message: "Tool deleted"})
  }

  export async function POST(request: Request, { params }: { params: IParams }) {
    const session = await getCurrentSession();
    const {toolId} = params 
    const body: UpdateCodingToolType = await request.json()
    const {name, description, category,path} = body

    if(!toolId) {
        return NextResponse.json({error: "No toolId provided"})
    }
    if (!session) {
    return NextResponse.json({error: "Unauthorized"})
    }
    if(session.role !== "admin") {
        return NextResponse.json({error: "Unauthorized"})
    }

     await db 
    .update(CodingTool)
    .set({
        name,
        description,
        category,
        path
    })
    .where(eq(CodingTool.id, toolId))
  

    return NextResponse.json({message: "Tool deleted"})
  }