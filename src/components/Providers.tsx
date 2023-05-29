"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, type FC } from 'react';
import {Toaster} from "react-hot-toast"

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    const queryClient= new QueryClient()

  return (
<QueryClientProvider client={queryClient}>
<Toaster position='top-center' />
{children}
</QueryClientProvider>
 )
}

export default Providers