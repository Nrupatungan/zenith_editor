"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { PaymentDetailsSchema, PaymentDetailsType } from '@/validators/payment-details.validator'
import { apiClient } from '@/lib/api-client'
import { useRouter } from 'next/navigation'
import { RazorpayResponse } from '@/app/transform/image/_components/AiPremium'
import { paymentAction } from '@/actions/payment-action'

function PaymentRegisterButton({id}: {id: string}) {
  const AMOUNT = 5*100;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  

  const form = useForm<PaymentDetailsType>({
    resolver: zodResolver(PaymentDetailsSchema),
    defaultValues: {
        billing_name: "",
        email: "",
        phone_number: "",
        gstin: "",
        billing_address: ""
    }
  })

  const { handleSubmit, control, formState, setError, reset} = form

  const submit = async (values: PaymentDetailsType) => {
    const order = await apiClient.createOrder(AMOUNT) as { id: string };
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID,
      amount: AMOUNT,
      currency: 'USD',
      name: 'Zenith Editor',
      description: 'Test Transaction',
      order_id: order.id,
      handler: async function (response: RazorpayResponse) {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = response
        const validatePayment: any = await apiClient.validateOrder({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature
        });

        if(validatePayment.result){
            const res = await paymentAction({
              userId: id,
              razorpay_payment_id,
              ...values
            });
            if(res.success){
              console.log("Payment successful");
            }else{
              console.error(res.error)
            }
        }
      },
      prefill: {
        name: values.billing_name,
        email: values.email,
        contact: values.phone_number
      },
      theme: {
          color: '#F37254'
      },
    };

    if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
    } else {
        console.error("Razorpay script not loaded.");
    }

    router.push("/billing")
  }


  return (
    <Dialog open={open} onOpenChange={(open) => {
        setOpen(open)
        reset()
    }}>
      <DialogTrigger asChild>
        <Button className='w-full mt-5'
        >
            Register Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment details</DialogTitle>
          <DialogDescription>
            Enter the required payment details for payment. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(submit)} autoComplete="off">

            <FormField
                control={control}
                name="billing_name"
                render={({ field }) => (
                <FormItem className='grid gap-3 mb-4'>
                    <FormLabel>Billing Name</FormLabel>
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                    <Input
                        type="email"
                        placeholder="e.g. john.doe@example.com"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={control}
                name="phone_number"
                render={({ field }) => (
                <FormItem className='grid gap-3 mb-4'>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                    <Input
                        type="text"
                        placeholder="e.g. +919876543210"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={control}
                name="gstin"
                render={({ field }) => (
                <FormItem className='grid gap-3 mb-4'>
                    <FormLabel>GSTIN</FormLabel>
                    <FormControl>
                    <Input
                        type="text"
                        placeholder="e.g. 06AB7897154"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={control}
                name="billing_address"
                render={({ field }) => (
                    <FormItem className="grid gap-2">
                    <FormLabel>Billing Address</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Please enter your address"
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

            {formState.isSubmitSuccessful &&
              <p className='mt-2 text-lime-600'>
                Details Submitted Successfully
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

export default PaymentRegisterButton