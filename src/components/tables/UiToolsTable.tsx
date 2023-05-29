"use client"
import { CodingToolType } from '@/db/tables/CodingTool';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fragment, type FC } from 'react';
import Button from '../ui/Button';
import ShouldRender from '../helpers/ShouldRender';
import TableRow from '../ui/TableRow';
import TableHeader from '../ui/TableHeader';
import TableLayout from '../TableLayout';
import Image from 'next/image';
import Link from 'next/link';

const UiToolsTable: FC = () => {
  const querykey = ["uitools"]
  
  const fetchUser = async ({pageParam = 0}) => {
      try {
        const response = await axios.get("/api/designer-tool/get-all", {
          params: {
            offset: pageParam,
            limit: 15
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const {data,fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery<CodingToolType[]>({
      queryKey: querykey,
      queryFn: fetchUser,
      getNextPageParam: (lastPage, allPages) => {
        const lastPageLength = lastPage.length;
        return lastPageLength > 0 ? allPages.length * 15 : undefined;
      },
  })

  function handleLoadMore() {
      fetchNextPage();
    };

  return (
    <>
    <TableLayout> 
    <thead className='bg-cardContainer rounded-md '>
    <TableHeader>Image</TableHeader>
      <TableHeader>Name</TableHeader>
      <TableHeader>Path</TableHeader>
      <TableHeader>Category</TableHeader>
      <TableHeader>Action</TableHeader>
    </thead>
    <tbody>
    {data?.pages?.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page?.map((tool) => (
                  <tr key={tool.id}>
                    <TableRow>
                      <Image 
                      src={tool.imageSrc} 
                      alt={tool.name}
                      width={50} 
                      height={50} />
                    </TableRow>
                  <TableRow>{tool.name}</TableRow>
                  <TableRow>
                    <a 
                    className='text-cta1 hover:underline font-semibold transition duration-200'
                    href={tool.path}>
                    {tool.path}
                    </a>
                  </TableRow>
                  <TableRow>{tool.category}</TableRow>
                  <TableRow>
                    <Link 
                    className='text-cta1 hover:text-blue-600 font-semibold transition duration-200'
                    href={`/admin/ui-tools/${tool.id}`}>View Item</Link>
                  </TableRow>
                  </tr>
        ))}
        </Fragment>
        ))}
    </tbody>
    </TableLayout>
    
    <ShouldRender if={hasNextPage}>
        <div className='w-full flex justify-center'>
          <Button
          variant='cta'
            className="mt-4"
            size="default"
          onClick={handleLoadMore}
           disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        </div>
    </ShouldRender>
    </>
)
}

export default UiToolsTable