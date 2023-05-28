
import { CodingTool } from "@/db/tables/CodingTool";
import { db } from "@/lib/db";
import { CreateCodingToolType } from "@/schema/coding-tool.schema";
import { getCurrentSession } from "@/utils/getSession";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getCurrentSession()
    const body: CreateCodingToolType = await request.json();
    const {category,description,id,imageSrc,name,path} = body;
    
    if(!session) {
        return  NextResponse.json({message: "You are not logged in"})
    }
    if(session.role !== "admin") {
        return NextResponse.json({message: "You are not authorized to perform this action"})
    }
    if(!category || !description || !id || !imageSrc || !name || !path) {
        return NextResponse.json({message: "All fields are required"})
    }

    const designerTool = await db
    .insert(CodingTool)
    .values({
        id,
        name,
        description,
        category,
        imageSrc,
        path
    })

    return NextResponse.json({message: "Designer tool created successfully"})
}