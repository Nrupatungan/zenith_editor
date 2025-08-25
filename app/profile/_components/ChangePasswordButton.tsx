"use client"

import { changePasswordAction } from '@/actions/change-password-action'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ChangePasswordSchema, ChangePasswordType } from '@/validators/change-password.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { set } from 'date-fns'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function ChangePasswordButton() {
    const [open, setOpen] = useState(false);
    const form = useForm<ChangePasswordType>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    })
    
    const { handleSubmit, control, formState, setError, reset} = form;

    const submit = async (values: ChangePasswordType) => {
        try {
            const res = await changePasswordAction(values);

            if(!res.success){
                switch(res.statusCode){
                    case 400:
                        const nestedErrors = res.error.fieldErrors;

                        if(nestedErrors && "oldPassword" in nestedErrors)
                            setError("oldPassword", { message: nestedErrors.oldPassword?.[0] });
                        if(nestedErrors && "newPassword" in nestedErrors)
                            setError("newPassword", { message: nestedErrors.newPassword?.[0] });
                        if(nestedErrors && "confirmPassword" in nestedErrors)
                            setError("confirmPassword", { message: nestedErrors.confirmPassword?.[0] });
                    break;

                    case 401:
                    case 404:
                        setError("root", { message: res.error });
                    break;

                    case 402:
                        setError("oldPassword", { message: res.error });
                    break;
                    
                    case 500:
                    default:
                        const error = res.error || "Internal Server Error";
                        setError("root", { message: error });
                }
            }else{
                setOpen(false)
            }
        } catch (error) {
            console.error(error)
            setError("root", { message: "Something went wrong" });
        }
    }

  return (
    <Dialog open={open} onOpenChange={(open) => {
        setOpen(open)
        reset()
    }}>
        <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-2">Change Password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
            <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                    Change your password. Click submit when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(submit)} autoComplete="off">
                    <div className='flex flex-col gap-6'>
                    <FormField
                        control={control}
                        name="oldPassword"
                        render={({ field }) => (
                        <FormItem className="grid gap-3">
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                            <Input type="password" placeholder="e.g. ********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="newPassword"
                        render={({ field }) => (
                        <FormItem className="grid gap-3">
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                            <Input type="password" placeholder="e.g. ********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                        <FormItem className="grid gap-3">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                            <Input
                                type="password"
                                placeholder="e.g. ********"
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
                            Password changed successfully.
                        </p>
                    }

                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button variant="outline" type="button" onClick={() => reset()}>Cancel</Button>
                        </DialogClose>

                        <Button 
                        type="submit"
                        disabled={formState.isSubmitting} className="cursor-pointer">
                            Submit {formState.isSubmitting && <Loader2 className="animate-spin"/>}
                        </Button>
                    </DialogFooter>
                </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordButton