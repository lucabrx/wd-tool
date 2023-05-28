import { User } from "@/db";
import { UserType } from "@/db/tables/User";
import { authOptions } from "@/lib/authOptions"
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next"

export async function getSession() {
  return await getServerSession(authOptions)
}
export async function getCurrentSession() {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUsers = await db
    .select()
    .from(User)
    .where(eq(User.email, session.user.email))
    
   const user = currentUsers[0] as UserType
    
    

    if (!user) {
      return null;
    }

    return user
}