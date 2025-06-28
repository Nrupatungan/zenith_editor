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
import { useForm } from "react-hook-form"
import UploadFileSchema, { UploadFileType } from '@/validators/upload.validator'
import FileUpload from "./FileUpload"

const UploadModalButton = () => {

  const form = useForm<UploadFileType>({
    resolver: zodResolver(UploadFileSchema),
    defaultValues: {                     
      title: "",
      alt: "",
      objectUrl: ""
    },
  })

  const {handleSubmit, control, formState, setError} = form;

  const submit = async (values: UploadFileType) => {

  };

  return (
    <Dialog>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(submit)}
            autoComplete="false"
          >
          <DialogTrigger asChild>
            <Button><UploadIcon/> Upload File</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload File</DialogTitle>
                <DialogDescription>
                  Upload your original file to apply transformations on it. Click submit when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className='grid gap-3'>
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
                  <FormItem className='grid gap-3'>
                    <FormLabel>Alternative Text</FormLabel>
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
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
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

              <FileUpload />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Submit</Button>
              </DialogFooter>

            </DialogContent>
          </form>
        </Form>
      
    </Dialog>
  )
}

export default UploadModalButton