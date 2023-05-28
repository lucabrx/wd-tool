import { User } from "@/db"
import { db } from "@/lib/db"
import { getCurrentSession } from "@/utils/getSession"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

interface Body {
    userId: string
}

export async function POST(request: Request) {
    const session = await getCurrentSession()
    const body: Body = await request.json()
    const {userId} = body
    if(!session) {
        return new Response("Unauthorized", { status: 401 })
    }
    if(session.role !== "admin") {
        return new Response("Unauthorized", { status: 401 })
    }

     await db
    .update(User)
    .set({role: "admin"})
    .where(eq(User.id, userId))

    return NextResponse.json({message: "User role updated"})
}