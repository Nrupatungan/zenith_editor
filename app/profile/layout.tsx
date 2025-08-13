import { Toaster } from "@/components/ui/sonner";

function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
        <Toaster richColors expand={true} />
    </>
  )
}

export default ProfileLayout