import { type NextPage } from 'next';
import { HTMLAttributes } from 'react';

interface TableLayoutProps extends HTMLAttributes<HTMLTableElement> {
  
}

const TableLayout: NextPage<TableLayoutProps> = ({children}) => {
  return (
<div className='overflow-auto pt-1 rounded-md flex justify-center items-center '>
<table className="shadow-lg  rounded-md border-collapse  overflow-x-auto whitespace-nowrap block scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue lighter scrollbar-w-2 scrolling-touch p-2">
  {children}
</table>
</div>
)
}

export default TableLayout