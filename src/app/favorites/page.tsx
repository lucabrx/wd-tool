import CodingFavorites from "@/components/CodingFavorites";
import DesignFavorites from "@/components/DesignFavorites";
import EmptyToSignIn from "@/components/helpers/NoSession";
import { getCurrentSession } from "@/utils/getSession";

export default async function Favorites() {
    const session = await getCurrentSession()

    if(!session) {
        return <EmptyToSignIn />
    }

    return (
        <div className="w-full pt-4 flex flex-col justify-center items-center">
        <h1 className="w-full text-center md:text-left text-2xl font-semibold text-text md:px-4 md:text-3xl">Your Favorites</h1>
        <h2 className="w-full text-center  text-xl font-semibold text-text/80 md:px-4 mt-4 md:text-2xl">Coding Favorites</h2>

        <CodingFavorites />

        <h2 className="w-full text-center  text-xl font-semibold text-text/80 md:px-4 mt-4 md:text-2xl">Design Favorites</h2>
        <DesignFavorites />
        </div>
    )
}