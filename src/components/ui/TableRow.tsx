import { type NextPage } from 'next';
import {TableHTMLAttributes} from 'react'

interface TableRowProps extends TableHTMLAttributes<HTMLTableDataCellElement> {
  
}

const TableRow: NextPage<TableRowProps> = ({children}) => {
  return <td  className="border px-8 py-4 text-center" >{children}</td>

}

export default TableRow