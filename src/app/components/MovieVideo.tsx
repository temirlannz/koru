import React from 'react'
import prisma from "@/app/utils/client";
import {Button} from "@/components/ui/button";

const getData = async () => {
    const data = await prisma.movie.findFirst({
        where: {
            id: 0
        },
        select: {
            title: true,
            overview: true,
            videoSource: true,
            imageString: true,
            release: true,
            duration: true,
            id: true,
            age: true,
        },
    });

    return data;
}

const MovieVideo = async () => {
    const data = await getData();

    return (
        <div className='h-[55vh] lg:h-[60vh] w-full flex justify-start items-center'>
            <video
                src={data?.videoSource}
                poster={data?.imageString}
                autoPlay
                muted
                loop
                className='w-full absolute top-0 left-0 h-[60vh] object-cover -z-10 brightness-[60%]'
            >
            </video>

            <div className='absolute w-[90%] lg:w-[40%] mx-auto'>
                <h1 className='text-white text-4xl md:text-5xl lg:text-6xl font-bold'>
                    {data?.title}
                </h1>

                <p className='text-white text-lg mt-5'>
                    {data?.overview}
                </p>

                <div className="flex gap-x-3 mt-4">
                    <Button>See more</Button>
                    <Button>Learn more</Button>
                </div>
            </div>
        </div>
    )
}
export default MovieVideo
