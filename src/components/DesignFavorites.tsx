"use client"
import { CodingToolType } from '@/db/tables/CodingTool';
import { FavoriteType } from '@/db/tables/Favorite';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { type FC } from 'react';
import ItemCard from './ItemCard';
import { DesignerToolType } from '@/db/tables/DesignerTool';

interface CodingFavoritesProps {
    data: {
        Favorite: FavoriteType;
        DesignerTool: DesignerToolType;
    }[]
}

const DesignFavorites: FC = ({}) => {

    const {data:favorites} = useQuery<CodingFavoritesProps>({
        queryKey: ["design-favorites"],
        queryFn: () => axios.get("/api/favorite/get-all-design-favorite")
    })
  return (
    <div className="flex flex-wrap  gap-4 justify-center items-center w-full pt-6">

    {favorites?.data?.map((tool) => (
        <ItemCard tool={tool.DesignerTool} key={tool.DesignerTool.id} />
))}
    </div>
)
}

export default DesignFavorites