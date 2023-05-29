"use client"
import CategoryCard from "@/components/CategoryCard"
import ItemCard from "@/components/ItemCard"
import ShouldRender from "@/components/helpers/ShouldRender"
import Button from "@/components/ui/Button"
import { DesignerToolType } from "@/db/tables/DesignerTool"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Fragment, useState } from "react"


const categories = [
    {
        name: 'Inspirations',
        src: '/designCategory/inspiration.svg',
    },
    {
        name: "Illustrations",
        src: '/designCategory/illustration.svg',
    },
    {
        name: "Icons",
        src: '/designCategory/icons.svg',
    },
    {
        name: "Colors",
        src: '/designCategory/colors.svg',
    },
    {
        name: "Mockups",
        src: '/designCategory/mockup.svg',
    },
    {
        name: "Stock Images",
        src: '/designCategory/stockImg.svg',
    },
    {
        name: "Design Tools",
        src: '/designCategory/designTools.svg',
    },
    {   
        name: "Blogs",
        src: '/designCategory/blogs.svg',
    },
    {
        name: "AI",
        src: '/designCategory/ai.svg',
    },
    {
        name: "Podcasts",
        src: '/designCategory/podcasts.svg',
    },
    {
        name: "Learning",
        src: '/designCategory/learning.svg',
    },
    {
        name: "Typography",
        src: '/designCategory/typo.svg',
    },
    {
        name: "Books",
        src: '/designCategory/books.svg',
    },
    {
        name: "Videos",
        src: '/designCategory/videos.svg',
    }

]
export default  function DesignHome() {
    const [category, setCategory] = useState<string>("Inspirations")

    const fetchTools = async ({pageParam = 0}) => {
        try{
            const response = await axios.get("/api/designer-tool/get-by-category", {
                params: {
                    category,
                    limit: 10, 
                    offset: pageParam
                }
            })
            return response.data
        } catch(err) {
            console.log(err)
            throw err
        }
    }

    const {data, isLoading,fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery<DesignerToolType[]>({
        queryKey: ["designer-tools-category", category],
        queryFn: fetchTools,
        getNextPageParam: (lastPage, allPages) => {
            const lastPageLength = lastPage.length;
            return lastPageLength > 0 ? allPages.length * 9 : undefined;
          },
    })

    function handleLoadMore() {
        fetchNextPage();
      };


    return (
        <div className="w-full pt-4 flex flex-col justify-center items-center">
        <h1 className="w-full text-center md:text-left text-2xl font-semibold text-text md:px-4">Design Tools</h1>

        <div className="flex justify-center items-center gap-4 flex-wrap pt-2 md:pt-4 md:px-4">
        {
            categories.map((categ,i) => (
                <CategoryCard
                key={i}
                alt={categ?.name!}
                src={categ?.src!}
                name={categ?.name!}
                clickEvent={() => setCategory(categ?.name!)}
                selected={category}
            />
       ))}
        </div>

       
    <div className="flex flex-wrap  gap-4 justify-center items-center w-full pt-6">

        {data?.pages?.map((page, pageIndex) => (
      <Fragment key={pageIndex}>
        {page?.map((tool) => (
            <ItemCard tool={tool} key={tool.id} />
    ))}
    </Fragment>
    ))}

    </div>

    <ShouldRender if={hasNextPage}>
      <Button 
        variant="cta"
        className="mt-4 px-4"
        size="default"
      onClick={handleLoadMore}
       disabled={isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </Button>
    </ShouldRender>

        
    </div>
    )
}