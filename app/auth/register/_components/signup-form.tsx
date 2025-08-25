"use client"

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import SignUpSchema, { SignUpType } from '@/validators/signup.validator'
import { ModeToggle } from '@/components/ModeToggle'
import { signupUserAction } from '@/actions/signup-action'
import { Loader2 } from 'lucide-react'

const SignUpForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
    const router = useRouter()

    const form = useForm<SignUpType>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
        },
    })

    const {handleSubmit, control, formState, setError} = form;

    form.watch("password")

    const submit = async (values: SignUpType) => {
      try {
        const res = await signupUserAction(values)
  
        if(res.success){
          router.push("/auth/register/success")
        } else {
          switch(res.statusCode){
            case 400:
              const nestedErrors = res.error.fieldErrors
              console.error(nestedErrors)
              
              if(nestedErrors && "email" in nestedErrors)
                setError("email", { message: nestedErrors.email?.[0] });
              if(nestedErrors && "password" in nestedErrors)
                setError("password", { message: nestedErrors.password?.[0] });
              if(nestedErrors && "name" in nestedErrors)
                setError("name", { message: nestedErrors.name?.[0] });
              if(nestedErrors && "confirmPassword" in nestedErrors)
                setError("confirmPassword", { message: nestedErrors.confirmPassword?.[0] });
          
              break;

            case 409:
              setError("root", { message: String(res.error) });
              break;
            
            case 500:
              setError("root", { message: String(res.error) });
              break;
          }
        }
      } catch (error) {
          console.error(error)
          setError("root", { message: "Something went wrong" });
      }
    };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
      <CardContent className="p-0">
      <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="p-6 md:p-8"
        autoComplete="false"
      >
        <div className='flex flex-col gap-6'>
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-balance">
                  Create a new Zenith account
                </p>
              </div>
              <div>
                <ModeToggle/>
              </div>
            </div>

            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className='grid gap-3'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. john smith"
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
                <FormItem className='grid gap-3'>
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

          {formState.errors.root &&
            <p className='mt-2 text-red-600'>
              {formState.errors.root?.message}
            </p>
          }

          {
            formState.isSubmitSuccessful &&
            <p className='mt-2 text-lime-600'>
              User registered successfully
            </p>
          }

          <Button
            type="submit"
            disabled={formState.isSubmitting}
            className="w-full cursor-pointer"
          >
            Sign up {formState.isSubmitting && <Loader2 className="animate-spin"/>}
          </Button>
        
        </div>
      </form>
    </Form>
    </CardContent>
    </Card>
  </div>
  )
}

export default SignUpForm