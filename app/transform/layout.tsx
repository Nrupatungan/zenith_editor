
import { SidebarProvider } from "@/components/ui/sidebar";
import Script from "next/script";

export default async function TransformLayout({
    children,
}: {
children: React.ReactNode;
}) {

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider defaultOpen={true} className="flex flex-col">
                    {children}
            </SidebarProvider>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
        </div >
    );
}