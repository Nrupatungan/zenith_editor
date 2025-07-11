
import { SidebarProvider } from "@/components/ui/sidebar";
import ResizeModal from "./image/_components/ResizeModal";
import OverlayModal from "./image/_components/OverlayModal";
import AiModal from "./image/_components/AiModal";
import EffectsModal from "./image/_components/EffectsModal";

export default async function TransformLayout({
    children,
}: {
children: React.ReactNode;
}) {

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider defaultOpen={true} className="flex flex-col">
                {children}
                <ResizeModal />
                <OverlayModal />
                <AiModal />
                <EffectsModal />
            </SidebarProvider>
        </div >
    );
}