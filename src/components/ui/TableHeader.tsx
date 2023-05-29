import { type NextPage } from 'next';
import {TableHTMLAttributes} from 'react'
interface TableHeaderProps extends TableHTMLAttributes<HTMLTableHeaderCellElement> {
  
}

const TableHeader: NextPage<TableHeaderProps> = ({children, ...props}) => {
  return (
    
<th className=" border text-center px-8 py-3 text-text " {...props}>{children}</th>
)
}

export default TableHeader