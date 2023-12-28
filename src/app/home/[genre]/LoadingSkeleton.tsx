import React from 'react'
import {Skeleton} from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
    return (
        <div>
            <Skeleton className='h-[40px] w-[150px] mt-10' />

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6'>
                <Skeleton className='h-[240px] w-[286px]' />
                <Skeleton className='h-[240px] w-[286px]' />
                <Skeleton className='h-[240px] w-[286px]' />
                <Skeleton className='h-[240px] w-[286px]' />
                <Skeleton className='h-[240px] w-[286px]' />
                <Skeleton className='h-[240px] w-[286px]' />
            </div>
        </div>
    )
}
export default LoadingSkeleton
