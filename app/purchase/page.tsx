import Navbar from '@/components/Navbar'
import PricingPage from './_components/pricing-page'

function PurchasePage() {
  
  return (
    <div className='min-h-screen bg-gray-200 dark:bg-background'>
        <Navbar/>
        <PricingPage />
    </div>
  )
}

export default PurchasePage