"use client"
import { useRouter } from 'next/navigation';
import { type FC } from 'react';



const RedirectHome: FC = ({}) => {
    const router = useRouter()

    router.back()
  return null

}

export default RedirectHome