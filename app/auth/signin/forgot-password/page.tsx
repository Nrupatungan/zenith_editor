import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import ResetPasswordForm from "./_components/reset-password-form";


export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ token: string }>
}) {
  const { token } = await searchParams;

  if (!token) return <TokenIsInvalidState />;
  
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
        token
    }
  })

  if (!verificationToken?.expires) return <TokenIsInvalidState />;

  const isExpired = new Date(verificationToken.expires) < new Date();

  if (isExpired) return <TokenIsInvalidState />;

  return (
    <main className='container mx-auto px-7 overflow-hidden'>
      <div className='min-h-screen grid place-content-center'>
        <div className="border-4 border-green-700 p-6">
          <div className="text-3xl font-bold tracking-tight mb-5">Forgot Password?</div>
            <p className="text-center">Click this button to set your password:</p>
            
            <div className="my-3 text-center">
                <ResetPasswordForm
                email={verificationToken.identifier}
                token={token}
                />
            </div>

            <div>
                <span>
              No longer need to reset your password? Click{" "}
              <Button variant="link" size="sm" className="px-0" asChild>
                <Link href="/auth/signin">here</Link>
              </Button>{" "}
              to sign up again.
            </span>
            </div>
        </div>
      </div>
    </main>
  );
}

const TokenIsInvalidState = () => {
  return (
    <main className='container mx-auto px-7 overflow-hidden'>
      <div className='min-h-screen grid place-content-center'>
        <div className="border-4 border-red-700 p-6">
          <div className="text-3xl font-bold tracking-tight mb-5">Forgot Password?</div>
            <p>Token is invalid.</p>
            
            <span>
              Click{" "}
              <Button variant="link" size="sm" className="px-0" asChild>
                <Link href="/auth/register">here</Link>
              </Button>{" "}
              to sign in page so you can request a new forgot password email.
            </span>
        </div>
      </div>
    </main>
  );
};