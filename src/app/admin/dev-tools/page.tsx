import AdminSidebar from "@/components/AdminSidebar"
import Hydrate from "@/components/helpers/Hydrate"
import RedirectHome from "@/components/helpers/RedirectHome"
import CodingToolsTable from "@/components/tables/CodingToolsTable"
import UserTable from "@/components/tables/UserTable"
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
        Coding Tools Table
       </h2>
       <Hydrate>
       <CodingToolsTable />
       </Hydrate>
       </div>
        </>
    )

}