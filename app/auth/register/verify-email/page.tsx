import { verifyCredentialsEmailAction } from "@/actions/verify-credentials-email-action";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

type PageProps = { searchParams: { token: string } };

export default async function Page({ searchParams }: PageProps) {
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

  const res = await verifyCredentialsEmailAction(token);

  if (!res.success) return <TokenIsInvalidState />;

  return (
    <main className='container mx-auto px-7 overflow-hidden'>
      <div className='min-h-screen grid place-content-center'>
        <div className="border-4 border-green-700 p-6">
          <div className="text-3xl font-bold tracking-tight mb-5">Verify Email</div>
            <p>Email verified.</p>
            
            <span>
              Click{" "}
              <Button variant="link" size="sm" className="px-0" asChild>
                <Link href="/auth/signin">here</Link>
              </Button>{" "}
              to sign up again.
            </span>
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
          <div className="text-3xl font-bold tracking-tight mb-5">Verify Email</div>
            <p>Token is invalid.</p>
            
            <span>
              Click{" "}
              <Button variant="link" size="sm" className="px-0" asChild>
                <Link href="/auth/register">here</Link>
              </Button>{" "}
              to sign up again.
            </span>
        </div>
      </div>
    </main>
  );
};