import React from 'react'
import TopBar from '../profile/_components/top-bar'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ContentHeaders from './_components/ContentHeaders'

function BillingPage() {
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
                <ContentHeaders title='Plan Name' value='Business Plan' />
                <ContentHeaders title='Number of available users in workspace' value='10' />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex justify-between items-center'>
                <CardTitle className='text-xl'>Next Billing Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <ContentHeaders title='Payment' value='$5' italicText='(billed monthly)' />
                <ContentHeaders title='Next invoice date' value='10' />
              </CardContent>
            </Card>

            <Card className='col-span-2'>
              <CardHeader className='flex justify-between items-center'>
                <CardTitle className='text-xl'>Billing Details</CardTitle>
                <CardAction>
                  <Button>Edit Billing Address</Button>
                </CardAction>
              </CardHeader>
              <CardContent className='space-y-4'>
                <ContentHeaders title='Payment' value='$5' italicText='(billed monthly)' />
                <ContentHeaders title='Next invoice date' value='10' />
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  )
}

export default BillingPage