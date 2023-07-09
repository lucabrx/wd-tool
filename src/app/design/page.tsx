import DesignToolContent from "@/components/DesignToolContent"
import { getCurrentSession } from "@/utils/getSession"



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
export default async  function DesignHome() {
    const session = await getCurrentSession()
  return <DesignToolContent session={session} />
}