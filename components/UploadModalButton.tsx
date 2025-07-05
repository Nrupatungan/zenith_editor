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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from "./ui/input"
import { Loader2, UploadIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import UploadFileSchema, { UploadFileType } from '@/validators/upload.validator'
import { useRouter } from "next/navigation"
import useUpload from "@/hooks/use-upload"
import { uploadAction } from "@/actions/upload-action"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { useState } from "react"


const UploadModalButton =  () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession()
  const {progress, handleUpload, url, fileId} = useUpload() 
  const router = useRouter()

  const form = useForm<UploadFileType>({
    resolver: zodResolver(UploadFileSchema),
    defaultValues: {
      file: null,
      title: "",
      alt: "",
    }
  })

  const { handleSubmit, control, formState, setError, reset} = form

  const submit = async (values: UploadFileType) => {
    try {
      const uploadResponse = await handleUpload(values.file);
      // Use uploadResponse.fileId and uploadResponse.url directly
      const res = await uploadAction({
        ...values,
        fileId: uploadResponse.fileId ?? "",
        objectUrl: uploadResponse.url ?? "",
        userId: session?.user?.id!,
      });
      if (res.success) {
        toast.success("File uploaded Successfully")
        setOpen(false); // Close the dialog
        reset(); // Reset the form fields
        router.push("/");
      } else {
        toast.error(res.error)
        setError("root", { message: res.error });
      }
    } catch (error) {
      toast.error("Failed to upload file")
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
                name="file"
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

            {( progress > 0 && progress < 100) && <progress value={progress} max={100} className="w-full h-1 my-3 rounded-md"></progress>}

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