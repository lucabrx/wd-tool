"use client"
import { CodingToolType } from '@/db/tables/CodingTool';
import { FavoriteType } from '@/db/tables/Favorite';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { type FC } from 'react';
import ItemCard from './ItemCard';

interface CodingFavoritesProps {
    data: {
        Favorite: FavoriteType;
        CodingTool: CodingToolType;
    }[]
}

const CodingFavorites: FC = ({}) => {

    const {data:favorites} = useQuery<CodingFavoritesProps>({
        queryKey: ["coding-favorites"],
        queryFn: () => axios.get("/api/favorite/get-all-coding-favorite")
    })
  return (
    <div className="flex flex-wrap  gap-4 justify-center items-center w-full pt-6">

    {favorites?.data?.map((tool) => (
        <ItemCard tool={tool.CodingTool} key={tool.CodingTool.id} />
))}
    </div>
)
}

export default CodingFavorites