"use client"
import { User } from 'lucide-react';
import { FC, Fragment } from 'react';
import TableLayout from '../TableLayout';
import TableHeader from '../ui/TableHeader';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserType } from '@/db/tables/User';
import TableRow from '../ui/TableRow';
import Button from '../ui/Button';
import ShouldRender from '../helpers/ShouldRender';
import { toast } from 'react-hot-toast';
interface User {
  userId: string
}

const UserTable: FC = ({}) => {
    const querykey = ["users"]
    const queryClient = useQueryClient()
    const fetchUser = async ({pageParam = 0}) => {
        try {
          const response = await axios.get("/api/user/get-users", {
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

      const {data,fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery<UserType[]>({
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

    const {mutate: setAdmin} = useMutation({
        mutationFn: (data: User ) => ( axios.post("/api/user/set-admin", data)),
        onSuccess: () => {
            toast.success("Role changed")
        },
        onError: () => {
            toast.error("Error changing role")
        },
        onSettled: () => {
            queryClient.invalidateQueries(querykey)
        }
    })
    const {mutate: setUser} = useMutation({
        mutationFn: (data: User ) => ( axios.post("/api/user/set-user", data)),
        onSuccess: () => {
            toast.success("Role changed")
        },
        onError: () => {
            toast.error("Error changing role")
        },
        onSettled: () => {
            queryClient.invalidateQueries(querykey)
        }
    })
    

  return (
    <>
<TableLayout> 
<thead className='bg-cardContainer rounded-md '>
<TableHeader>Name</TableHeader>
  <TableHeader>Email</TableHeader>
  <TableHeader>Role</TableHeader>
  <TableHeader>Action</TableHeader>
</thead>
<tbody>
{data?.pages?.map((page, pageIndex) => (
      <Fragment key={pageIndex}>
        {page?.map((user) => (
              <tr key={user.id}>
              <TableRow>{user.name}</TableRow>
              <TableRow>{user.email}</TableRow>
              <TableRow>{user.role}</TableRow>
              <td className='border px-8 py-4 text-center flex justify-center'>
              {
                user.role === "user" ? (
                <Button
                onClick={() => setAdmin({userId: user.id})}
                variant='cta'>   
                Set Admin
              </Button>
                ) : (
                    <Button
                    onClick={() => setUser({userId: user.id})}
                    variant='cta'>   
                    Set User
                  </Button>
                )
              }
              </td>
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

export default UserTable