import { DesignerToolType } from '@/db/tables/DesignerTool';
import { CodingToolType } from '@/db/tables/CodingTool';
import Image from 'next/image';
import { type FC } from 'react';
import Button from './ui/Button';

interface ItemCardProps {
  tool : DesignerToolType | CodingToolType
}

const ItemCard: FC<ItemCardProps> = ({tool}) => {
  const desc = tool.description.slice(0, 190)
  return (
<div className='flex flex-col justify-between items-center w-full max-w-[420px] bg-cardContainer shadow-sm rounded-md md:max-w-[300px] p-4 relative h-[360px]'> 
<span className='badge absolute top-2 left-2 py-1 px-2 bg-gray-300/20 text-sm rounded-md font-medium '>{tool.category}</span>

<div className='pt-2'>
    <Image 
    src={tool.imageSrc!}
    alt={tool.name!}
    width={130}
    height={130}
    />
</div>

<div className=' flex flex-col justify-start items-start space-y-2'>
    <a href={tool.path} className='text-text font-bold text-center text-2xl hover:underline hover:text-cta2 duration-300 transition-all'>{tool.name}</a>
    <p className='text-gray-300 text-sm pb-2'>{desc}...</p>
    <Button className='self-end px-4 ' variant="cta"><a href={tool.path}>Vist Tool</a></Button>
</div>

</div>
)
}

export default ItemCard