"use client"
import {  Code, Code2, LayoutDashboardIcon, Paintbrush, Pen, PenTool } from 'lucide-react';
import { type FC } from 'react';
import AdminLink from './ui/AdminLink';



const navigationLink = [
    {
        path: '/admin',
        icon: LayoutDashboardIcon,
        title: 'Dashboard'
    },
    {
        path:"/admin/create-dev-tool",
        icon: Pen,
        title: "Create Dev Tool"
    },
    {
        path:"/admin/create-designer-tool",
        icon: PenTool,
        title: "Create UI Tool"
    },
    {
        path:"/admin/dev-tools",
        icon: Code2,
        title: "Coding Tools"
    },
    {
        path:"/admin/ui-tools",
        icon: Paintbrush,
        title: "UI Tools"
    },
]

const AdminSidebar: FC = () => {
  return (
<div  className='w-[230px]  fixed left-0 top-[60px] h-screen bottom-0 bg-cardContainer border-smText/40 border-r  hidden lg:block pb-3  shadow-sm '> 
<div className='flex flex-col  w-full h-full pt-8  px-4 space-y-2 '>
{
    navigationLink.map((item,i)  => (
        <AdminLink key={i}
        icon={item.icon}
        path={item.path}
        title={item.title}
        />
    ))
}
</div>
</div>
)
}

export default AdminSidebar