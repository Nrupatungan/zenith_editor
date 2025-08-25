"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from "./ui/input"
import { Loader2, UploadIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import UploadFileSchema, { UploadFileType } from '@/validators/upload.validator'
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import useModalStore from "@/store"


const UploadModalButton =  () => {
  const [open, setOpen] = useState(false);
  const {mutateObject} = useModalStore()
  const router = useRouter();

  const form = useForm<UploadFileType>({
    resolver: zodResolver(UploadFileSchema),
    defaultValues: {
      object: undefined,
      title: "",
      alt: "",
    }
  })

  const { handleSubmit, control, formState, setError, reset} = form

  const submit = async (values: UploadFileType) => {
    const formData = new FormData();
        
    Object.entries(values).forEach(([key, value]) => {
        if (value) {
            formData.append(key, value);
        }
    });

    try {
        const response = await fetch('/api/objects', {
            method: "POST",
            body: formData
        })

        if (response.ok) {
            const messageData = await response.json();
            toast.success(messageData.message);
            setOpen(false);
            reset();
            if(mutateObject) mutateObject();
            router.refresh();
        } else {
            const errorData = await response.json();
            toast.error(errorData.error || "Failed to upload file");
            setError("root", { message: errorData.error || "An unknown error occurred" });
        }
    } catch(error){
        toast.error("Failed to upload file");
        setError("root", { message: error instanceof Error ? error.message : String(error) });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
        setOpen(open)
        reset()
    }}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer"><UploadIcon /> Upload File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Upload your original file to apply transformations on it. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(submit)} autoComplete="off">

            <FormField
                control={form.control}
                name="object"
                render={({ field }) => (
                  <FormItem className='grid gap-3 mb-4'>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={e => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />

            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem className='grid gap-3 mb-4'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. My fav video"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            <FormField
              control={control}
              name="alt"
              render={({ field }) => (
                <FormItem className='grid gap-3 mb-4'>
                  <FormLabel>Alternative Text</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. My fav image"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formState.errors.root &&
              <p className='mt-2 text-red-600'>
                {formState.errors.root?.message}
              </p>
            }

            {formState.isSubmitSuccessful &&
              <p className='mt-2 text-lime-600'>
                Object created Successfully
              </p>
            }

            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="outline" type="button" onClick={() => reset()}>Cancel</Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">Submit {formState.isSubmitting && <Loader2 className="animate-spin"/>}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadModalButton