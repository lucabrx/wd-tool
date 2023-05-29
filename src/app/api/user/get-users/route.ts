import { User } from "@/db"
import { db } from "@/lib/db"
import { getCurrentSession } from "@/utils/getSession"
import { desc } from "drizzle-orm"
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

    const users = await db
    .select()
    .from(User)
    .offset(Number(offset))
    .limit(Number(limit))
    .orderBy(desc(User.created_at))

    return NextResponse.json(users)
}