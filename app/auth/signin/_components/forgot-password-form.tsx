import { forgotPasswordAction } from '@/actions/forgot-password-action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ForgotPasswordSchema, ForgotPasswordType } from '@/validators/forgot-password.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

function ForgotPasswordForm() {
    const [open, setOpen] = useState(false);
    const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
        email: ""
    }
  })

  const { handleSubmit, control, formState, setError, reset} = form;

  const submit = async (values: ForgotPasswordType) => {
    try {
        const res = await forgotPasswordAction(values);

        if(!res.success){
            switch (res.statusCode) {
                case 400:
                    const nestedErrors = res.error.fieldErrors;

                    if (nestedErrors && "email" in nestedErrors) {
                        setError("root", { message: nestedErrors.email?.[0] });
                    }
                break;
                case 401:
                    setError("root", { message: res.error });
                break;
                case 500:
                default:
                    const error = res.error || "Internal Server Error";
                    setError("root", { message: error });
            }
        }else{
            reset();
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
            <p className="ml-auto text-sm underline-offset-2 hover:underline cursor-pointer">
                Forgot your password?
            </p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Forgot Password</DialogTitle>
                <DialogDescription>
                    Enter your email to reset your password. Click submit when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(submit)} autoComplete="off">
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='grid gap-3 mb-4'>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                type="email"
                                placeholder="e.g. john.smith@example.com"
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

export default ForgotPasswordForm