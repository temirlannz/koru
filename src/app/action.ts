'use server';

import prisma from "@/app/utils/client";
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/utils/auth";

export const addToWatchList = async (formData: FormData) => {
    const movieId = formData.get('movieId');
    const pathname = formData.get('pathname') as string;
    const session = await getServerSession(authOptions);

    const data = await prisma.watchList.create({
        data: {
            userId: session?.user?.email as string,
            movieId: Number(movieId)
        }
    });

    revalidatePath(pathname);
}

export const deleteFromWatchList = async (formData: FormData) => {
    const watchListId = formData.get('watchListId') as string;
    const pathname = formData.get('pathname') as string;

    const data = await prisma.watchList.delete({
        where: {
            id: watchListId
        }
    });

    revalidatePath(pathname);
}