"use client"
import { useRouter } from 'next/navigation';
import { type FC } from 'react';



const RedirectBack: FC = ({}) => {
    const router = useRouter()

    router.push("/")
  return null

}

export default RedirectBack