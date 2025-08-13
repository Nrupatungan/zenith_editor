"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

function DeleteButton() {
  const handleDelete = async () => {

  }

  return (
    <Button variant="outline" className="w-full border-red-500 dark:border-red-500 text-red-500"
    onClick={handleDelete}
    >Delete Account</Button>
  )
}

export default DeleteButton