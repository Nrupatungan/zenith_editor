"use client"

import { paymentAction } from "@/actions/payment-action";
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { apiClient } from "@/lib/api-client";
import useModalStore from "@/store";
import { CircleCheck, Codesandbox } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export interface RazorpayOptions {
    id: string
    key: string | undefined;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => Promise<void>;
    prefill: {
    name: string;
    email: string;
    contact: string;
    };
    theme: {
    color: string;
    };
}

export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

function AiPremium() {
  const AMOUNT = 5*100;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { transformUrl } = useModalStore()
  const searchParams = useSearchParams()
  const objectUrl = searchParams.get('objectUrl')
  const imageSrc = transformUrl || (objectUrl as string)

  const handlePayment = async () => {
    setLoading(true)
    try {
        const order = await apiClient.createOrder(AMOUNT) as { id: string };

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
            amount: AMOUNT,
            currency: 'USD',
            name: 'Zenith Editor',
            description: 'Test Transaction',
            order_id: order.id, // This is the order_id created in the backend
            handler: async function (response: RazorpayResponse) {
                const validatePayment: any = await apiClient.validateOrder({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature
                });

                if(validatePayment.result){
                    await paymentAction();
                }
            },
            prefill: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            contact: '9999999999'
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

        router.push(`/transform/image?objectUrl=${imageSrc}`)
    } catch (error) {
        console.error("Payment failed", error);
    } finally{
        setLoading(false)
    }

  }

  return (
    <Card>
        <CardHeader>
            <span className='bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-bold animate-gradient-flow'
            >
                Premium plan
            </span>
            <CardDescription>
                Best for freelancers and teams.
            </CardDescription>
            <CardAction>
                <Codesandbox />
            </CardAction>
        </CardHeader>
        <CardContent>
            <p className='font-extralight tracking-wide'>Plan includes:</p>
            <ul className='flex flex-col gap-2 mt-2 text-sm'>
                <li className='flex items-center gap-3'><CircleCheck className="size-4 text-blue-500 dark:text-blue-300"/> Everything from free plan</li>
                <li className='flex items-center gap-3'><CircleCheck className="size-4 text-blue-500 dark:text-blue-300"/> AI Transformations</li>
                <li className='flex items-center gap-3'><CircleCheck className="size-4 text-blue-500 dark:text-blue-300"/> Upto 5 Users</li>
            </ul>
        </CardContent>
        <CardFooter className='flex-col'>
            <div className='self-start flex'>
                <span className='font-normal'>$</span>
                <span className='text-6xl'>5</span>
                <span className='self-end'>/month</span>
            </div>
            <Button className='w-full mt-5'
            onClick={handlePayment}
            disabled={loading}
            >
                Register Now
            </Button>
        </CardFooter>
    </Card>
  )
}

export default AiPremium