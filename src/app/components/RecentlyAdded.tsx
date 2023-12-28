import React from 'react'
import prisma from "@/app/utils/client";
import Image from "next/image";
import MovieCard from "@/app/components/MovieCard";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/utils/auth";

const getData = async (userId: string) => {
    const data = await prisma.movie.findMany({
        select: {
            id: true,
            overview: true,
            title: true,
            WatchLists: {
                where: {
                    userId: userId
                }
            },
            imageString: true,
            youtubeString: true,
            age: true,
            release: true,
            duration: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 4,
    });

    return data;
}

const RecentlyAdded = async () => {
    const session = await getServerSession(authOptions);
    const data = await getData(session?.user?.email as string);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-5'>
            {data.map(movie => (
                <div key={movie.id} className='relative h-48'>
                    <Image
                        src={movie.imageString}
                        alt='Movie'
                        width={500}
                        height={450}
                        className='rounded-sm absolute w-full h-full object-cover'
                    />

                    <div className='h-60 relative z-10 w-full transform transition duration-500 hover: scale-125 opacity-0 hover:opacity-100'>
                        <div className='bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center'>
                            <Image
                                src={movie.imageString}
                                alt='Movie'
                                width={800}
                                height={800}
                                className='rounded-sm absolute w-full h-full -z-10 object-cover'
                            />

                            <MovieCard
                                title={movie.title}
                                overview={movie.overview}
                                movieId={movie.id}
                                watchList={movie.WatchLists.length > 0}
                                watchListId={movie.WatchLists[0]?.id}
                                youtubeUrl={movie.youtubeString}
                                year={movie.release}
                                age={movie.age}
                                time={movie.duration}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default RecentlyAdded
