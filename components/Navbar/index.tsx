import Link from 'next/link'
import React from 'react'
import LogoIcon from '../LogoIcon'
import { ModeToggle } from '../ModeToggle'
import { auth } from '@/lib/next-auth/auth'
import { redirect } from 'next/navigation'
import { User2Icon } from 'lucide-react'
import Avatar from './_components/Avatar'

const Navbar = async () => {
    const session = await auth()

    if(!session) redirect('/auth/signin');
    return (
        <header className='sticky top-0 left-0 z-30 border-b border-slate-400/30 bg-background'>
            <div className="container mx-auto px-4 h-16">
                    <div className='flex items-center justify-between gap-4 h-full'>
                        <Link href={session?.user ? "/" : "/auth/signin"}>
                            <div className="flex space-x-2 items-center">
                                <LogoIcon height='30px' width='30px' className="fill-blue-600" />
                                <span className="text-lg sm:text-xl font-semibold">Zenith</span>
                            </div>
                        </Link>

                        <div className="flex items-center justify-center space-x-3 sm:space-x-5">
                            <Avatar imageSrc={session.user?.image ?? null} altText='Avatar image' />
                            <ModeToggle/>
                        </div>
                    </div>

            </div>
        </header>
  )
}

export default Navbar