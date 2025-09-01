"use client"

import PaymentRegisterButton from "@/components/PaymentRegisterButton"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { CircleCheck, Codesandbox } from "lucide-react"

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

function AiPremium({id}: {id: string}) {

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
            <PaymentRegisterButton id={id} />
        </CardFooter>
    </Card>
  )
}

export default AiPremium