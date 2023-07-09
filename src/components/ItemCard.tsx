"use client"
import { DesignerToolType } from '@/db/tables/DesignerTool';
import { CodingToolType } from '@/db/tables/CodingTool';
import Image from 'next/image';
import { useState, type FC } from 'react';
import Button from './ui/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {  Heart } from 'lucide-react';
import ShouldRender from './helpers/ShouldRender';
import { type UserType } from '@/db/tables/User';
import useLoginModal from '@/hooks/useLoginModal';
import { useClickOutside } from '@/hooks/useClickOutside';

interface ItemCardProps {
  tool : DesignerToolType | CodingToolType;
  session? : UserType | null;
}

interface FavoriteId {
  toolId: string
}

const ItemCard: FC<ItemCardProps> = ({tool,session}) => {
  const [loading,setLoading] = useState(false)
  const queryKey = ["favorite", tool.id]
  const queryKey2 = ["coding-favorites"]
  const queryKey3 = ["design-favorites"]
  const queryClient = useQueryClient()
  const loginModal = useLoginModal()


  const desc = tool.description.slice(0, 190)
  const {data} = useQuery({
    queryKey: queryKey,
    queryFn: () => axios.get(`/api/favorite/get-favorite/${tool.id}`),
  })
  

  const {mutate:addToFavorite} = useMutation({
    mutationFn: (data: FavoriteId) => ( axios.post("/api/favorite/add-favorite",data)),
    onSuccess: () => {
      toast.success("Added to favorites")
    },
    onError: () => {
      toast.error("Something went wrong")
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
      queryClient.invalidateQueries(queryKey2)
      queryClient.invalidateQueries(queryKey3)
      setLoading(false)
    }

  })
   
  const {mutate:removeFromFavorite} = useMutation({
    mutationFn: (data: FavoriteId) => ( axios.post("/api/favorite/remove-favorite",data)),
    onSuccess: () => {
      toast.success("Removed from favorites")

    },
    onError: () => {
      toast.error("Something went wrong")
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
      queryClient.invalidateQueries(queryKey2)
      queryClient.invalidateQueries(queryKey3)
      setLoading(false)
    }
    
  })

  function addToFav (toolId: string) {
    if(!session) {
      loginModal.open()
      return
    }
    addToFavorite({
      toolId: tool.id
    })
    setLoading(true)
  }
  function removeFromFav (toolId: string) {
    removeFromFavorite({
      toolId: tool.id
    })
    setLoading(true)
  }
  return (
<div className='flex flex-col justify-between items-center w-full max-w-[420px] bg-cardContainer shadow-sm rounded-md md:max-w-[300px] p-4 relative h-[360px]'> 
<span className='badge absolute top-2 left-2 py-1 px-2 bg-gray-300/20 text-sm rounded-md font-medium '>{tool.category}</span>


<ShouldRender if={data?.data.length! === 0 || !session}>
<Button
className='absolute top-2 right-2'
variant="icon-container"
disabled={loading}
onClick={() => addToFav(tool.id)}><Heart /></Button>
</ShouldRender>

<ShouldRender if={data?.data.length! === 1}>
<Button
className='absolute top-2 right-2'
variant="icon-container"
disabled={loading}
onClick={() => removeFromFav(tool.id)}><Heart fill="red" />
</Button>
</ShouldRender>

<div className='pt-2'>
    <Image 
    src={tool.imageSrc!}
    alt={tool.name!}
    width={130}
    height={130}
    />
</div>

<div className=' flex flex-col justify-start items-start space-y-2'>
    <a href={tool.path} className='text-text font-bold text-center text-2xl hover:underline hover:text-cta2 duration-300 transition-all'>{tool.name}</a>
    <p className='text-gray-300 text-sm pb-2'>{desc}...</p>
    <Button className='self-end px-4 ' variant="cta"><a href={tool.path}>Vist Tool</a></Button>
</div>

</div>
)
}

export default ItemCard