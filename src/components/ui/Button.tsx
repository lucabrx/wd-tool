import { type NextPage } from 'next';
import {cva, VariantProps} from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/classMerge';

export const buttonVariant = cva('flex justify-center  items-center rounded-md  transition-all duration-500 ', {
    variants: {
        variant: {
            "default" : '',
            "cta" : 'shadow-sm bg-gradient-to-br from-cta1 to-cta2 hover:to-cta1 font-bold text-md tracking-wider text-[18px] ',
            "cta-card" : "shadow-sm bg-gradient-to-br from-cta1 to-cta2 hover:to-cta1  text-md tracking-wider",
            "google" : "shadow-sm bg-[#fefffe] hover:bg-[#fefffe]/70 text-[#111926] w-[290px] font-bold text-[18px] tracking-weider",
            "discord" : "shadow-sm bg-[#6266f0] hover:bg-[#6266f0]/70 text-[#d8dee5] w-[290px] font-bold text-[18px] tracking-weider",
            "github" : "shadow-sm bg-[#27272a] hover:bg-[#27272a]/70 text-[##fefffe] w-[290px] font-bold text-[18px] tracking-weider",
            "icon-container" : "bg-transparent, hover:bg-gray-600/30",
            "ghost" : "bg-transparent hover:bg-gray-600/30 text-gray-700 hover:text-gray-800 font-bold text-[18px] px-4 py-1.5 w-[85px]",
            "danger" : "shadow-sm bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg tracking-weider px-4 py-1.5 ",
        },
        size: {
            "default" : 'px-2 p-1',
            "cta-icon" : "px-4 p-2 gap-2",
            "cta-card" : "w-[65px] p-1",
            "cta" : "px-2 min-w-[90px] py-1.5",
            "icon-container" : "p-1 rounded"
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariant> {
isLoading? : boolean  
}


const Button: NextPage<ButtonProps> = ({className,size,variant,isLoading,children, ...props}) => {
  return (
<button {...props} className={cn(buttonVariant({size,variant,className}))}> 
{isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
{children}
</button>
)
}

export default Button