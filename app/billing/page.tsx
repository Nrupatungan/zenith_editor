import React from 'react'
import TopBar from '../profile/_components/top-bar'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ContentHeaders from './_components/ContentHeaders'
import { auth } from '@/lib/next-auth/auth'
import prisma from '@/lib/prisma'

async function BillingPage() {
  const session = await auth();
  const paymentData = await prisma.payment.findFirst({
    where: {
      userId: session?.user?.id
    }
  })

  return (
    <div className='container mx-auto px-7 overflow-hidden relative'>
        <div className='min-h-screen grid place-items-center'>
          <TopBar/>
          <div className='w-full grid grid-cols-2 gap-5'>
            <Card>
              <CardHeader className='flex justify-between items-center'>
                <CardTitle className='text-xl'>Your Plan Information</CardTitle>
                <CardAction>
                  <Button>Modify Subscription</Button>
                </CardAction>
              </CardHeader>
              <CardContent className='space-y-4'>
                <ContentHeaders title='Plan Name' value={paymentData?.isPremium ? "Premium Plan" : "Free Plan"} />
                <ContentHeaders title='Number of available users in workspace' value='10' />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex justify-between items-center'>
                <CardTitle className='text-xl'>Next Billing Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <ContentHeaders title='Payment' value='$5' italicText='(billed monthly)' />
                <ContentHeaders title='Next invoice date' value='10/01/26' />
              </CardContent>
            </Card>

            <Card className='col-span-2'>
              <CardHeader className='flex justify-between items-center'>
                <CardTitle className='text-xl'>Billing Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-3 gap-20'>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Billing Name
                    </p>
                    <h3 className="text-sm font-medium">{paymentData?.billing_name}</h3>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Email Address
                    </p>
                    <h3 className="text-sm font-medium">{paymentData?.email}</h3>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Phone Number
                    </p>
                    <h3 className="text-sm font-medium">{paymentData?.phone_number}</h3>
                  </div>
                  
                </div>

                <div className='grid grid-cols-3 gap-20'>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Razorpay payment ID
                    </p>
                    <h3 className="text-sm font-medium">{paymentData?.razorpay_payment_id}</h3>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      GSTIN
                    </p>
                    <h3 className="text-sm font-medium">{paymentData?.gstin}</h3>
                  </div>

                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Billing Address
                    </p>
                    <h3 className="text-sm font-medium">{paymentData?.billing_address}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  )
}

export default BillingPage