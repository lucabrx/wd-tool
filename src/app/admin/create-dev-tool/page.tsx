import AdminSidebar from "@/components/AdminSidebar"
import DevToolHome from "@/components/content/DevToolHome"
import RedirectHome from "@/components/helpers/RedirectHome"
import { getCurrentSession } from "@/utils/getSession"

export default async function DeveloperToolCreator() {
    const session = await getCurrentSession()

    if(session?.role !== "admin") {
        return <RedirectHome  />
    } 

    return (
        <>
        <AdminSidebar />

       <div className="w-full ml-[230px] pt-4">
       <h2 className="text-2xl text-text text-left font-bold">
        Developer Tool Creator
       </h2>
       <DevToolHome />
       </div>
        </>
    )

}