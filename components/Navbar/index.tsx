import Link from 'next/link'
import React from 'react'
import LogoIcon from '../LogoIcon'
import NavUser, { NavUserProps } from './_components/nav-user'

const Navbar = async ({user}: NavUserProps) => {

    return (
        <header className='sticky top-0 left-0 z-30 border-b border-slate-400/30 bg-gray-100  dark:bg-background'>
            <div className="container mx-auto px-4 h-16">
                    <div className='flex items-center justify-between gap-4 h-full'>

                        <Link href="/" className="flex space-x-2 items-center">
                            <LogoIcon height='30px' width='30px' className="fill-blue-600" />
                            <span className="text-lg sm:text-xl font-semibold">Zenith</span>
                        </Link>

                        <NavUser user={user} />
                    </div>

            </div>
        </header>
  )
}

export default Navbar