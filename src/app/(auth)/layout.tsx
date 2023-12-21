import React, {ReactNode} from 'react';
import BackgroundImage from '../../../public/login_background.jpg';
import Logo from '../../../public/netflix_logo.svg';
import Image from "next/image";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='relative flex flex-col h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent'>
            <Image
                src={BackgroundImage}
                alt='Background Image'
                className='hidden sm:flex sm:object-cover -z-10 brightness-50'
                priority
                fill
            />

            <Image
                src={Logo}
                alt='Logo'
                width={120}
                height={120}
                className='absolute left-4 top-4 object-contain md:left-10 md:top-10'
            />

            { children }
        </div>
    )
}
export default AuthLayout;
