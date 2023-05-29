import AdminSidebar from "@/components/AdminSidebar"
import CodeToolAction from "@/components/CodeToolAction"
import RedirectBack from "@/components/helpers/RedirectHome"
import RedirectHome from "@/components/helpers/RedirectHome"
import { getDevToolById } from "@/utils/getDevToolById"
import { getCurrentSession } from "@/utils/getSession"
import Image from "next/image"

interface IParams {
   params: {
         toolId: string
    }
  }

export default async function CodingTool({params}: IParams) {
    const session = await getCurrentSession()
    const tool = await getDevToolById(params.toolId)

   
    if(session?.role !== "admin") {
        return <RedirectHome  />
    } 
    if(!tool) {
        return <RedirectBack />
    }

    return (
        <>
        <AdminSidebar />

       <div className="w-full ml-[230px] pt-4 flex-col flex justify-center items-center">
       <h2 className="text-2xl text-text text-left font-bold">
        {tool.name}
       </h2>

       <div className="flex justify-center items-center w-full gap-6 pt-4">
        <Image 
        src={tool.imageSrc}
        width={250}
        height={200}
        alt={tool.name}
        />
        <div className="flex flex-col justify-center items-start space-y-3">
           <p className="font-bold text-text text-xl">Category: <span className="text-smText font-medium">
            {tool.category}</span>
            </p>
            <p className="font-bold text-text text-xl">Path: <a className="underline text-cta1 text-xl font-medium" href={tool.path}>{tool.path}</a>
            </p>

            
        </div>
       </div>
       <CodeToolAction tool={tool} />
 
       </div>
    </>
    )
}