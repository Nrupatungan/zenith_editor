"use client"

import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

export default function TopBar() {
  return (
    <div className='container fixed top-0 w-full'>
        <div className='w-full p-5 flex justify-between'>
            <Button variant="ghost" className='underline'
            onClick={() => redirect("/")}
            ><ArrowLeft/> Back</Button>
            <ModeToggle/>
        </div>
    </div>
  )
}
