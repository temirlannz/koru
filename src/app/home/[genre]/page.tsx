import React, {Suspense} from 'react'
import prisma from "@/app/utils/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/utils/auth";
import Image from "next/image";
import MovieCard from "@/app/components/MovieCard";
import Loading from "@/app/home/[genre]/loading";

const getData = async (category: string, userId: string) => {
    switch (category) {
        case 'shows': {
            const data = await prisma.movie.findMany({
                where: {
                    category: 'show',
                },
                select: {
                    age: true,
                    duration: true,
                    id: true,
                    title: true,
                    release: true,
                    imageString: true,
                    overview: true,
                    youtubeString: true,
                    WatchLists: {
                        where: {
                            userId: userId
                        }
                    }
                }
            });
            return data;

        } case 'movies': {
            const data = await prisma.movie.findMany({
                where: {
                    category: 'movie',
                },
                select: {
                    age: true,
                    duration: true,
                    id: true,
                    title: true,
                    release: true,
                    imageString: true,
                    overview: true,
                    youtubeString: true,
                    WatchLists: {
                        where: {
                            userId: userId
                        }
                    }
                }
            });
            return data;

        } case 'recently': {
            const data = await prisma.movie.findMany({
                where: {
                    category: 'recent',
                },
                select: {
                    age: true,
                    duration: true,
                    id: true,
                    title: true,
                    release: true,
                    imageString: true,
                    overview: true,
                    youtubeString: true,
                    WatchLists: {
                        where: {
                            userId: userId
                        }
                    }
                }
            });
            return data;
        }
        default: {
            throw new Error();
        }
    }
}

const CategoryPage = async ({ params }: {params: { genre: string }}) => {
    const session = await getServerSession(authOptions);
    const data = await getData(params.genre, session?.user?.email as string)

    return (
        <>
            <h1 className='text-white text-4xl mt-10 font-bold px-5 sm:px-0'>
                {params.genre.charAt(0).toUpperCase() + params.genre.slice(1)}
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6'>
                <Suspense fallback={<Loading />}>
                    {data.map(movie => (
                        <div key={movie.id} className='relative h-60'>
                            <Image
                                priority
                                src={movie.imageString}
                                alt={movie.title}
                                width={500}
                                height={400}
                                className='rounded-sm absolute w-full h-full object-cover'
                            />

                            <div className='h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100'>
                                <div className='bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full flex items-center justify-center'>
                                    <Image
                                        priority
                                        src={movie.imageString}
                                        alt={movie.title}
                                        width={800}
                                        height={800}
                                        className='rounded-sm absolute -z-10 w-full h-full object-cover'
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
                </Suspense>
            </div>
        </>
    )
}
export default CategoryPage
