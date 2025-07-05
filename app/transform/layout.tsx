
import { SidebarProvider } from "@/components/ui/sidebar";

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
        </div >
    );
}