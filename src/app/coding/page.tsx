import CodingToolsContent from "@/components/CodingToolsContent"
import { getCurrentSession } from "@/utils/getSession"


export default async function CodingHome() {
    const session = await getCurrentSession()
    return <CodingToolsContent session={session} />
}