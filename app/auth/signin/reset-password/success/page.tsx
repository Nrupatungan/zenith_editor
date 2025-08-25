import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className='container mx-auto px-7 overflow-hidden'>
      <div className='min-h-screen grid place-content-center'>
        <div className="border-4 border-green-700 p-6">
          <div className="text-3xl font-bold tracking-tight mb-5">Reset Password</div>
            <p className="mb-5">Password has been successfully reset!</p>
            
            <span>
                Click{" "}
                <Button variant="link" size="sm" className="px-0" asChild>
                    <Link href="/auth/signin">here</Link>
                </Button>{" "}
                to sign in.
            </span>
        </div>
      </div>
    </main>
  );
}