import Script from 'next/script'

export default async function PurchaseLayout({
    children,
}: {
children: React.ReactNode;
}) {

    return (
        <>
            {children}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
        </>
    );
}