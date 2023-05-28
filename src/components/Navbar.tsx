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

interface NavbarProps {
  session?: UserType | null
}

const Navbar: NextPage<NavbarProps> = ({session}) => {
    const [isOpen, setOpen] = useState(false)
    const loginModal = useLoginModal();
    
  return (
<div className='w-full mx-auto flex justify-center bg-cardContainer border-smText/40 border-b h-[60px]'> 
<div className='max-w-[1200px]   w-full h-full flex  items-center justify-between px-[20px]'>
  
    <Link href='/' className='cursor-pointer max-w-[190px] h-[20px]'>
    <Logo.Logo />
    </Link>

    <Button className='md:hidden' >
    <Hamburger toggled={isOpen} toggle={setOpen} rounded />
    </Button>

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