import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

interface CategoryCardProps {
  src: string 
  alt: string  
  name : string 
  clickEvent: () => void;
  selected: string
}

const CategoryCard: FC<CategoryCardProps> = ({src,alt,name,clickEvent,selected}) => {
  return (
<div 
onClick={clickEvent}
className={ selected === name ? "w-[130px] h-[130px]  rounded-md flex justify-center items-center gap-2 flex-col shadow-sm cursor-pointer transition-all duration-300 bg-categoryCard ring-1 ring-cta1/70 p-2" : "w-[130px] h-[130px] bg-categoryCard/50 rounded-md flex justify-center items-center gap-2 flex-col shadow-sm cursor-pointer transition-all duration-300 hover:bg-categoryCard hover:ring-1 hover:ring-cta1/70 p-2"}> 
<Image
src={src!}
alt={alt!}
width={36}
height={36}
/>
<h2 className='text-text font-bold text-center'>{name}</h2>
</div>

)
}

export default CategoryCard