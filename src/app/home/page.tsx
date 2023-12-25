import React from 'react'
import MovieVideo from "@/app/components/MovieVideo";
import RecentlyAdded from "@/app/components/RecentlyAdded";

const Home = () => {
    return (
        <div className='p-5 lg:p-0'>
            <MovieVideo />
            <h1 className='text-3xl font-bold '>
                Recently Added
            </h1>
            <RecentlyAdded />
        </div>
    )
}
export default Home
