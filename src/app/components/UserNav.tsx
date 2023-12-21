'use client';

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {signOut} from "next-auth/react";

const UserNav = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='h-10 w-10 rounded-sm'>
                    <AvatarImage src='https://xisnxnvmmrsnbsqfspzm.supabase.co/storage/v1/object/public/user%20image/avatar.png' />
                    <AvatarFallback className='rounded-sm'>Tim</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>Tim</p>
                        <p className='text-xs leading-none text-muted-foreground'>t.zhanibek@bk.ru</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className='cursor-pointer'>
                    Sign-out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserNav
