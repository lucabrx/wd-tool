import { getCurrentSession } from '@/utils/getSession'
import './globals.css'
import Navbar from '@/components/Navbar'
import Hydrate from '@/components/helpers/Hydrate'
import Footer from '@/components/Footer'
import LoginModal from '@/components/LoginModal'
import Providers from '@/components/Providers'


export const metadata = {
  title: 'Web Dev Tools',
  description: 'Web Dev Tools for daily development tasks', 
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentSession()
  return (
    <html lang="en">
     <body >
        <div className='flex flex-col justify-between min-h-screen'>
        <Providers>
        <Hydrate>
        <LoginModal />
        </Hydrate>

        <Navbar session={session} />
        <div className='min-h-[calc(100vh-84px)] w-full flex justify-center'>
        <div className='min-h-[calc(100vh-84px)]  w-full max-w-[1186px] px-4  flex flex-col items-center justify-start'>
        {children}
        </div>
        </div>
        <Footer />
        </Providers>
        </div>    
      </body>  
    </html>
  )
}
