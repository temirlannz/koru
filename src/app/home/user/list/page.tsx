import React, {Suspense} from 'react'
import prisma from "@/app/utils/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/utils/auth";
import Image from "next/image";
import MovieCard from "@/app/components/MovieCard";
import Loading from "@/app/home/user/list/loading";

const getData = async (userId: string) => {
    const data = await prisma.watchList.findMany({
        where: {
            userId: userId,
        },
        select: {
            Movie: {
                select: {
                    title: true,
                    age: true,
                    duration: true,
                    imageString: true,
                    overview: true,
                    release: true,
                    id: true,
                    WatchLists: true,
                    youtubeString: true,
                }
            }
        }
    });

    return data;
}

const WatchList = async () => {
    const session = await getServerSession(authOptions);
    const data = await getData(session?.user?.email as string);

    return (
        <>
            <h1 className='text-white text-4xl mt-10 font-bold px-5 sm:px-0'>
                Your watch list
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6'>
                <Suspense fallback={<Loading />}>
                    {data.map(movie => (
                        <div key={movie.Movie?.id} className='relative h-60'>
                            <Image
                                src={movie.Movie?.imageString as string}
                                alt={movie.Movie?.title as string}
                                width={500}
                                height={400}
                                className='rounded-sm absolute w-full h-full object-cover'
                            />

                            <div className='h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100'>
                                <div className='bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full flex items-center justify-center'>
                                    <Image
                                        src={movie.Movie?.imageString as string}
                                        alt={movie.Movie?.title as string}
                                        width={800}
                                        height={800}
                                        className='rounded-sm absolute -z-10 w-full h-full object-cover'
                                    />

                                    <MovieCard
                                        title={movie.Movie?.title as string}
                                        overview={movie.Movie?.overview as string}
                                        movieId={movie.Movie?.id as number}
                                        watchList={movie.Movie?.WatchLists.length as number > 0}
                                        watchListId={movie.Movie?.WatchLists[0]?.id as string}
                                        youtubeUrl={movie.Movie?.youtubeString as string}
                                        year={movie.Movie?.release as number}
                                        age={movie.Movie?.age as number}
                                        time={movie.Movie?.duration as number}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </Suspense>
            </div>
        </>
    )
}
export default WatchList
