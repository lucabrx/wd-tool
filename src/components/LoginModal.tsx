"use client"
import { useRef, type FC } from 'react';
import Modal from './ui/Modal';
import useLoginModal from '@/hooks/useLoginModal';
import useLockOverflow from '@/hooks/useLockOverflow';
import Button from './ui/Button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
  
}

const LoginModal: FC<LoginModalProps> = ({}) => {
    const loginModal = useLoginModal();
    const loginModalRef = useRef<HTMLDivElement>(null);
    useLockOverflow(loginModal.isOpen);

    function googleLogin() {
        signIn('google')
        loginModal.close()
    }
    function githubLogin() {
        signIn('github')
        loginModal.close()
    }
    function discordLogin() {
        signIn('discord')
        loginModal.close()
    }

    const bodyContent = (
        <div className='w-full  flex flex-col justify-center items-center space-y-4 '>

        <Image className='select-none pb-2 w-auto ' alt='logo' src='./logo.svg' height={90} width={360}  /> 

      <h2 className='text-text text-2xl select-none'>Sign in to your account</h2>
      
      <div className=' flex flex-col items-center justify-center space-y-4'> 
      <Button  size='cta-icon' variant='google'  onClick={googleLogin}>
      <Image alt='google' src='./logo/google.svg' height={32} width={32} />
      Sign in with Google
      </Button>
      
      <Button  size='cta-icon' variant='github'  onClick={githubLogin}>
      <Image alt='github' src='./logo/github.svg' height={32} width={32} />
      Sign in with Github
      </Button>
      
      <Button  size='cta-icon' variant='discord'  onClick={discordLogin}>
      <Image alt='discord' src='./logo/discord.svg' height={32} width={32} />
      Sign in with Discord
      </Button>
      </div>
      </div>
      
    )
return (
<Modal 
ref={loginModalRef}
isOpen={loginModal.isOpen}
onClose={loginModal.close}
title="Hey there!"
body={bodyContent}
/>
)
}

export default LoginModal