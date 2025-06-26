import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils';
import { User2Icon } from 'lucide-react';
import React from 'react'

export interface AvatarProps{
    imageSrc: string | null;
    altText: string;
    className?: string;
}

const Avatar = ({
    imageSrc,
    altText,
    className
}: AvatarProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {imageSrc ?
                <img src={imageSrc} alt={altText} className={cn('rounded-full h-8 w-8', className)}></img>
            :
                <User2Icon className={cn("rounded-full border-2 border-white p-0.5 size-7 text-violet-300 bg-blue-800", className)} />
            }
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuLabel className='font-bold'>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <DropdownMenuItem>
            Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
            Dark
            </DropdownMenuItem>
            <DropdownMenuItem>
            Log out
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Avatar