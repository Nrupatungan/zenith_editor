import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import React from 'react'

const TransformPage = () => {
  return (
    <>
        <Navbar/>
        <div className='container mx-auto px-7 bg-background'>
            <div className='py-8 min-h-screen'>
                <Header>Transformations</Header>
            </div>
        </div>
    </>
  )
}

export default TransformPage