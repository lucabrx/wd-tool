import AdminSidebar from "@/components/AdminSidebar"
import RedirectHome from "@/components/helpers/RedirectHome"
import Button from "@/components/ui/Button"
import { getCurrentSession } from "@/utils/getSession"

export default async function Admin() {
    const session = await getCurrentSession()

    if(session?.role !== "admin") {
        return <RedirectHome  />
    } 

    return (
        <>
        <AdminSidebar />

       <div className="w-full ml-[230px] pt-4">
       <h2 className="text-2xl text-text text-left font-bold">
        Users
       </h2>
       </div>
        </>
    )

}