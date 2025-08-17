"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ProfileSchema, ProfileType } from '@/validators/profile.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"

function EditModalButton() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<ProfileType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            image: undefined,
            name: "",
            email: "",
            location: "",
            bio: ""
        }
    })

    const { handleSubmit, control, formState, setError, reset} = form;

    const submit = async (values: ProfileType) => {
        const formData = new FormData();
        
        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        try {
            const response = await fetch('/api/update-profile', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                toast.success("Profile updated successfully!");
                setOpen(false); // Close the dialog
                reset(); // Reset the form fields
                router.refresh();
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to update profile");
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
                <Button variant="outline" className='mt-3'>
                    <Edit2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Edit your profile as per your taste. Click submit when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(submit)} autoComplete="off">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field: { value, onChange, ...field } }) => (
                                <FormItem className='grid gap-3 mb-4'>
                                    <FormLabel>Profile picture</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => onChange(e.target.files?.[0])}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className='grid gap-3 mb-4'>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="e.g. John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='grid gap-3 mb-4'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="e.g. example@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className='grid gap-3 mb-4'>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="e.g. Bay Area, CA"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>About me</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none"
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

                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button variant="outline" type="button" onClick={() => reset()}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="cursor-pointer" disabled={formState.isSubmitting}>
                                {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditModalButton
