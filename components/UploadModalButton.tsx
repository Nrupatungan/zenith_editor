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
import { UploadIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form";
import UploadFileSchema, { UploadFileType } from '@/validators/upload.validator'
import FileUpload from "./FileUpload"
import { apiClient } from "@/lib/api-client"
import useStore from "@/store"
import { useRouter } from "next/navigation"

const UploadModalButton =  () => {
  const {data: session} = useSession();
  const { url, fileId } = useStore()
  const router = useRouter()

  const form = useForm<UploadFileType>({
    resolver: zodResolver(UploadFileSchema),
  })

  const { handleSubmit, control, formState, setError, watch} = form;
  const selectedType = watch("type");

  const submit = async (values: UploadFileType) => {
    if (!session?.user) return;

    console.log(url, fileId);

    if (!url || !fileId) {
      setError("root", { message: "Please upload a url or file Id before submitting." });
      return;
    }

    const {title, type, alt} = values;

    try {
      await apiClient.createObject({
        title: title,
        type: type,
        alt: alt ?? null,
        fileId: fileId,
        userId: session.user?.id!,
        objectUrl: url,
      })
      form.reset();
      router.push("/");
    } catch (error) {
      console.error(error)
      setError("root", { message: error instanceof Error ? error.message : String(error) });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><UploadIcon /> Upload File</Button>
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

            {selectedType === "image" && (
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
            )}

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className='grid gap-3 mb-4'>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a file type to upload" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="image">Image File</SelectItem>
                      <SelectItem value="video">Video File</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FileUpload className="grid" />

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
                <Button variant="outline" type="button" onClick={() => form.reset()}>Cancel</Button>
              </DialogClose>
              <Button type="submit" className="" disabled={!url}>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadModalButton