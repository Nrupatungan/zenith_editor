"use client"

import { resetPasswordAction } from '@/actions/reset-password-action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ResetPasswordSchema, ResetPasswordType } from '@/validators/reset-password.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export type ResetPasswordFormProps = { email: string; token: string };

function ResetPasswordForm({email, token}: ResetPasswordFormProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<ResetPasswordType>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })
    
    const { handleSubmit, control, formState, setError, reset} = form;

    const submit = async (values: ResetPasswordType) => {
        try {
            const res = await resetPasswordAction(email, token, values);

            if(res.success){
                router.push("/auth/signin/reset-password/success");
            }else{
                switch (res.statusCode) {
                    case 400:
                        const nestedErrors = res.error.fieldErrors;

                        if(nestedErrors && "password" in nestedErrors)
                            setError("password", { message: nestedErrors.password?.[0] });
                        if(nestedErrors && "confirmPassword" in nestedErrors)
                            setError("confirmPassword", { message: nestedErrors.confirmPassword?.[0] });
                    break;

                    case 401:
                        setError("root", { message: res.error });
                    break;
                    
                    case 500:
                    default:
                        const error = res.error || "Internal Server Error";
                        setError("root", { message: error });
                }
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
            <Button>Reset Password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
            <DialogHeader className='mb-5'>
                <DialogTitle>Reset Password</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(submit)} autoComplete="off">
                    <div className='flex flex-col gap-3'>
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                            <FormItem className="grid gap-3">
                                <FormLabel>Password</FormLabel>
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
                    </div>
                    

                    {formState.errors.root &&
                        <p className='mt-2 text-red-600'>
                            {formState.errors.root?.message}
                        </p>
                    }

                    {formState.isSubmitSuccessful &&
                        <p className='mt-2 text-lime-600'>
                            Password reset email sent.
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
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default ResetPasswordForm