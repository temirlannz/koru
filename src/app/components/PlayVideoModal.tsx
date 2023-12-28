import React, {FC} from 'react'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface iAppProps {
    title: string
    overview: string
    youtubeUrl: string
    state: boolean
    changeState: any
    release: number
    age: number
    duration: number
}

const PlayVideoModal: FC<iAppProps> = ({
    title,
    overview,
    youtubeUrl,
    state,
    changeState,
    release,
    age,
    duration
}) => {
    return (
        <Dialog open={state} onOpenChange={() => changeState(!state)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        { title }
                    </DialogTitle>

                    <DialogDescription className='line-clamp-3'>
                        { overview }
                    </DialogDescription>

                    <div className='flex gap-x-2 items-center'>
                        <p>{ release }</p>
                        <p className='border py-0.5 px-1 border-gray-200 rounded'>{ age }+</p>
                        <p>{ duration }h</p>
                    </div>
                </DialogHeader>

                <iframe
                    src={youtubeUrl}
                    height={250}
                    className='w-full'
                >
                </iframe>
            </DialogContent>
        </Dialog>
    )
}
export default PlayVideoModal
