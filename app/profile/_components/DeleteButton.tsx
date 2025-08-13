"use client"

import { deleteUserAction } from '@/actions/delete-user-action'
import { signoutAction } from '@/actions/signout-action'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

function DeleteButton({
  email,
}: {
  email: string
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await deleteUserAction(email);
      if(res.success){
        toast.success("User account deleted successfully!");
        try{
          await signoutAction()
          toast.success("Signed out successfully!");
        }catch(err){
          console.error(err)
          toast.success("Failed to sign out!");
        }
      }else{
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete your account!");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-red-500 dark:border-red-500 text-red-500"
        >Delete Account</Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              No
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteButton