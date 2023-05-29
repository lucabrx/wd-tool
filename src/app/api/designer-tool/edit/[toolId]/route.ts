  import { DesignerTool } from "@/db/tables/DesignerTool";
import { db } from "@/lib/db";
import { UpdateDesignerToolType } from "@/schema/designer-tool.schema";
  import { getCurrentSession } from "@/utils/getSession";
  import { eq } from "drizzle-orm";
  import { NextResponse } from "next/server";
  
  interface IParams {
      toolId?: string;
    }
  
    export async function DELETE(request: Request, { params }: { params: IParams }) {
      const session = await getCurrentSession();
      const toolId = params.toolId;
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
      .delete(DesignerTool)
      .where(eq(DesignerTool.id, toolId))
  
      return NextResponse.json({message: "Tool deleted"})
    }

    export async function POST(request: Request, { params }: { params: IParams }) {
      const session = await getCurrentSession();
      const {toolId} = params 
      const body: UpdateDesignerToolType = await request.json()
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
      .update(DesignerTool)
      .set({
          name,
          description,
          category,
          path
      })
      .where(eq(DesignerTool.id, toolId))
    
  
      return NextResponse.json({message: "Tool deleted"})
    }