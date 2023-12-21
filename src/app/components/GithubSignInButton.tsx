'use client';

import React from 'react'
import {GithubIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

const GithubSignInButton = () => {
    return (
        <Button onClick={() => signIn('github')} variant='outline' size='icon'>
            <GithubIcon className='w-4 h-4' />
        </Button>
    )
}
export default GithubSignInButton
