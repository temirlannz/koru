'use client';

import React, {FC, useState} from 'react'
import {Button} from "@/components/ui/button";
import {InfoIcon, PlayCircle} from "lucide-react";
import PlayVideoModal from "@/app/components/PlayVideoModal";

interface iAppProps {
    overview: string
    youtubeUrl: string
    id: number
    title: string
    release: number
    duration: number
    age: number
}

const MovieButtons: FC<iAppProps> = ({
    overview,
    youtubeUrl,
    id,
    title,
    release,
    duration,
    age
}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <PlayCircle className='mr-2 h-6 w-6' strokeWidth={1.5} /> Play
            </Button>
            
            <Button
                className='bg-white/40 hover:bg-white/30 text-white'
                onClick={() => setOpen(true)}
            >
                <InfoIcon className='mr-2 h-6 w-6' strokeWidth={1.5} />
                Learn More
            </Button>
            
            <PlayVideoModal
                title={title}
                overview={overview}
                youtubeUrl={youtubeUrl}
                state={open}
                changeState={setOpen}
                release={release}
                age={age}
                duration={duration}
            />
        </>
    )
}
export default MovieButtons
