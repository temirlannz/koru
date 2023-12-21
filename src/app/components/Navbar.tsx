'use client';

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/netflix_logo.svg";
import {usePathname} from "next/navigation";
import {twMerge} from "tailwind-merge";
import {Bell, Search} from "lucide-react";
import UserNav from "@/app/components/UserNav";

interface linkProps {
    name: string,
    href: string
}

const links: linkProps[] = [
    { name: 'Home', href: '/home' },
    { name: 'Tv Shows', href: '/home/shows' },
    { name: 'Movies', href: '/home/movies' },
    { name: 'Recently Added', href: '/home/recently' },
    { name: 'My List', href: '/home/user/list' }
];

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className='w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex'>
            <div className="flex items-center">
                <Link href='/home' className='w-32'>
                    <Image
                        src={Logo}
                        alt='Logo'
                        priority
                    />
                </Link>

                <ul className='lg:flex gap-x-4 ml-14 hidden'>
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={link.href}
                                className={
                                twMerge(
                                    'text-md hover:text-white transition',
                                    pathname == link.href
                                        ? 'text-white font-semibold'
                                        : 'text-gray-400'
                                )}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='flex items-center gap-5'>
                <Search className='w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition' />
                <Bell className='w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition' />
                <UserNav />
            </div>
        </nav>
    )
}
export default Navbar
