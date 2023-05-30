"use client"
import CategoryCard from "@/components/CategoryCard"
import ItemCard from "@/components/ItemCard"
import ShouldRender from "@/components/helpers/ShouldRender"
import Button from "@/components/ui/Button"
import { CodingToolType } from "@/db/tables/CodingTool"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Fragment, useState } from "react"


const categories = [
    {
        path: '/',
        name: 'AI',
        src: '/codingCategory/ai.svg',
    },
    {
        path: '/',
        name: "Testing",
        src: '/codingCategory/testing.svg',
    },
    {
        path: '/',
        name: "Frameworks",
        src: '/codingCategory/frameworks.svg',
    },
    {
        path: '/',
        name: "State",
        src: '/codingCategory/state.svg',
    },
    {
        path: '/',
        name: "Context",
        src: '/codingCategory/context.svg',
    },
    {
        path: '/',
        name: "Animation",
        src: '/codingCategory/animation.svg',
    },
    {
        path: '/',
        name: "Books",
        src: '/codingCategory/books.svg',
    },
    {   
        path: '/',
        name: "UI Libraries",
        src: '/codingCategory/uiLib.svg',
    },
    {
        path: '/',
        name: "Unstyled Libs.",
        src: '/codingCategory/unstayledLib.svg',
    },
    {
        path: "/",
        name: "Database",
        src: '/codingCategory/database.svg',
    },
    {
        path: "/",
        name: "Backend",
        src: '/codingCategory/backend.svg',
    },
    {
        path: "/",
        name: "Authentication",
        src: '/codingCategory/auth.svg',
    },
    {
        path: "/",
        name: "Tutorials",
        src: '/codingCategory/tutorials.svg',
    },
    {
        path: "/",
        name: "Hosting",
        src: '/codingCategory/hosting.svg',
    }

]

export default function CodingHome() {
    const [category, setCategory] = useState<string>("Frameworks")


    const fetchTools = async ({pageParam = 0}) => {
        try{
            const response = await axios.get("/api/coding-tool/get-by-category", {
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

    const {data, isLoading,fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery<CodingToolType[]>({
        queryKey: ["coding-tools-category", category],
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
        <h1 className="w-full text-center md:text-left text-2xl font-semibold text-text md:px-4">Coding Tools</h1>

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