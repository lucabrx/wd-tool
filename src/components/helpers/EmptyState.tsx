'use client';
import { FC } from "react";
import Button from "../ui/Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  action: () => void;
  actionLabel: string;
}

const EmptyState: FC<EmptyStateProps> = ({title,subtitle,action,actionLabel}) => {
  return ( 
    <div className="h-[60vh] flex flex-col gap-4 justify-center items-center">
        <h2 className='text-2xl font-bold text-neutral-50 text-center'>
        {title}
        </h2>
        <h3 className='font-light text-neutral-200 mt-2 text-center'>
        {subtitle}
        </h3>
        <Button 
        className="px-2 py-1"
        variant="cta"
        size="cta"
        onClick={action}> 
        {actionLabel} 
        </Button> 
    </div>
   );
}
 
export default EmptyState;