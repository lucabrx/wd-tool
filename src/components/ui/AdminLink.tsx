"use client"
import { Icon } from 'lucide-react';
import { useCallback, type FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Button from './Button';
 
interface AdminLinkProps {
  path: string;
  icon: Icon;
  title: string;
}

const AdminLink: FC<AdminLinkProps> = ({path,icon: Icon,title}) => {
const pathname = usePathname();
const router = useRouter();

const clickAction = useCallback(() => {
  router.push(path);
}, [router, path])

  return (
<div 
onClick={clickAction}
className={`flex items-center justify-start w-full py-1.5 rounded-md  hover:bg-zinc-500/20  transition-colors duration-200 pl-2 pr-4 mr-2 cursor-pointer gap-3
${pathname === path ? 'bg-zinc-500/20' : ''}
`}> 
<Button variant="icon-container">
    <Icon size={20} />
</Button>
<h2 className='text-lg font-medium'>{title}</h2>
</div>
)
}

export default AdminLink