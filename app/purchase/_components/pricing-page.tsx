"use client"

import { paymentAction } from '@/actions/payment-action';
import { RazorpayResponse } from '@/app/transform/image/_components/AiPremium';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader} from '@/components/ui/card';
import { apiClient } from '@/lib/api-client';
import { ArrowLeft, Box, CircleCheck, Codesandbox } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

function PricingPage() {
  const AMOUNT = 5*100;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
                      const res = await paymentAction();
                      if(res.success){
                        console.log("Payment successful");
                      }else{
                        console.error(res.error)
                      }
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
  
          router.push("/purchase")
      } catch (error) {
          console.error("Payment failed", error);
      } finally{
          setLoading(false)
      }
  
    }

  const handlePreviousRoute = () => {
    router.push("/")
  }

  return (
    <main className='container mx-auto px-7 overflow-hidden space-y-10'>
        <div className='relative'>
            <Button variant="ghost"
            onClick={handlePreviousRoute}
            className='underline'
            >
                <ArrowLeft/>
                Back
            </Button>
        </div>
        <div className='text-center flex flex-col space-y-3'>
            <h1 className='text-4xl font-bold'>Pricing plans</h1>
            <p>Try our free tier forever. Switch plans or cancel anytime.</p>
        </div>
        <div className='w-2xl mx-auto grid grid-cols-2 gap-8 py-10'>
            <Card className='shadow-2xl [box-shadow:0_0_35px_oklch(0.646_0.222_41.116)] dark:[box-shadow:0_0_35px_oklch(0.488_0.243_264.376)]'>
                <CardHeader>
                    <span className='font-bold'
                    >
                        Free plan
                    </span>
                    <CardDescription>
                        Test the waters with free plan.
                    </CardDescription>
                    <CardAction>
                        <Box />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className='font-extralight tracking-wide'>Plan includes:</p>
                    <ul className='flex flex-col gap-2 mt-2 text-sm'>
                        <li className='flex items-center gap-3'><CircleCheck className="size-4 text-blue-500 dark:text-blue-300"/> Resize and crop</li>
                        <li className='flex items-center gap-3'><CircleCheck className="size-4 text-blue-500 dark:text-blue-300"/> Text and Block Overlays</li>
                        <li className='flex items-center gap-3'><CircleCheck className="size-4 text-blue-500 dark:text-blue-300"/> Effects and Enhancements</li>
                    </ul>
                </CardContent>
                <CardFooter className='flex-col'>
                    <div className='self-start flex'>
                        <span className='font-normal'>$</span>
                        <span className='text-6xl'>0</span>
                        <span className='self-end'>/month</span>
                    </div>
                    <Button className='w-full mt-5'
                    onClick={() => redirect('/')}
                    >
                        Get Started
                    </Button>
                </CardFooter>
            </Card>

            <Card className='shadow-2xl [box-shadow:0_0_35px_oklch(0.828_0.189_84.429)] dark:[box-shadow:0_0_35px_oklch(0.627_0.265_303.9)]'>
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
        </div>
    </main>
  )
}

export default PricingPage