import { getCurrentSession } from '@/utils/getSession'
import Image from 'next/image'

export default async function Home() {
  const session = await getCurrentSession()
  return (
    <div className='min-h-[calc(100vh-84px)] w-full bg-cover md:bg-contain bg-center bg-no-repeat ' style={{backgroundImage: 'url(./background.svg)'}}>
    
      {
        session ? (
          <div>
            <Image src={session?.image!} alt="profile" width={100} height={100} />
            <p>{session.name}</p>
            <p>{session.email}</p>
          </div>
        ) : (
          <p>Not logged in</p>
        )
      }
    </div>
  )
}