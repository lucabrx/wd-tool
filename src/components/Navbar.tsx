"use client"
import { type NextPage } from 'next';
import { Turn as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import Button from './ui/Button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Logo } from './ui/Logo';
import { UserType } from '@/db/tables/User';
import useLoginModal from '@/hooks/useLoginModal';
import { usePathname, useRouter } from 'next/navigation';
import ShouldRender from './helpers/ShouldRender';
import useLockOverflow from '@/hooks/useLockOverflow';

interface NavbarProps {
  session?: UserType | null
}

const Navbar: NextPage<NavbarProps> = ({session}) => {
    const [isOpen, setOpen] = useState(false)
    const loginModal = useLoginModal();
    const router = useRouter();
    const pathname = usePathname();

    function handleClose(){
      setOpen(false)
    }
    useLockOverflow(isOpen)
  return (
<div className='w-full mx-auto flex justify-center bg-cardContainer border-smText/40 border-b h-[60px]'> 
<div className='max-w-[1200px]   w-full h-full flex  items-center justify-between px-[20px]'>
    
    <ShouldRender if={isOpen}>
    <div className='absolute  md:hidden top-[60px] bottom-0 left-0 right-0 z-[100]'>
    <div className='w-full h-full bg-cardContainer flex flex-col items-center justify-start gap-5 px-4 pt-8'>
    <Link
     onClick={handleClose}
    className= {`${pathname === "/" && "bg-zinc-700/50" } text-2xl text-text font-semibold cursor-pointer p-2 rounded-md hover:bg-zinc-700/50 w-full text-center `}
    href="/">
    Home
    </Link>
    <Link 
    onClick={handleClose}
    className={`${pathname === "/coding" && "bg-zinc-700/50" } text-2xl text-text font-semibold cursor-pointer p-2 rounded-md hover:bg-zinc-700/50 w-full text-center `}
    href="/coding">
    Coding
    </Link>
    <Link 
     onClick={handleClose}
    className={`${pathname === "/design" && "bg-zinc-700/50" } text-2xl text-text font-semibold cursor-pointer p-2 rounded-md hover:bg-zinc-700/50 w-full text-center `}
     href="/design">
      Design
      </Link>
   <Link 
    onClick={handleClose}
   className={`${pathname === "/favorites" && "bg-zinc-700/50" } text-2xl text-text font-semibold cursor-pointer p-2 rounded-md hover:bg-zinc-700/50 w-full text-center `}
    href="/favorites">
    Favorites
    </Link>
    </div>
    </div>
    </ShouldRender>
    
    <Link href='/' className='cursor-pointer max-w-[190px] h-[20px]'>
    <Logo.Logo />
    </Link>

    <Button className='md:hidden' >
    <Hamburger toggled={isOpen} toggle={setOpen} rounded />
    </Button>

    <div className='hidden md:flex justify-center items-center gap-5'>
    <Link className={
      pathname === '/' ? 'text-lg text-text font-semibold ' : 'text-lg text-text/80 font-semibold tracking-wider'
    } href="/">Home</Link>
    <Link className={
      pathname === '/coding' ? 'text-lg text-text font-semibold ' : 'text-lg text-text/80 font-semibold tracking-wider'
    } href="/coding">Coding</Link>
    <Link className={
      pathname === '/design' ? 'text-lg text-text font-semibold ' : 'text-lg text-text/80 font-semibold tracking-wider'
    } href="/design">Design</Link>
    <Link className={
      pathname === '/favorites' ? 'text-lg text-text font-semibold ' : 'text-lg text-text/80 font-semibold tracking-wider'
    } href="/favorites">Favorites</Link>

    <ShouldRender if={session?.role === "admin"}>
    <Button
    variant="cta"
    onClick={() => router.push('/admin')}
    >
    Admin
    </Button>
    </ShouldRender>
    </div>

    <div className='hidden md:block'>
    {
     session ? 
    <Button onClick={() => signOut()}  
    variant='cta' 
    size='cta'>Logout
    </Button>
    :
    <Button  
    onClick={loginModal.open}
    variant='cta' 
    size='cta'>Login
    </Button>
    }
    </div>

</div>
</div>
)
}

export default Navbar