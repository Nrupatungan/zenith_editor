import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className='container mx-auto px-7 overflow-hidden'>
      <div className='min-h-screen grid place-content-center'>
        <div className="border-4 border-green-700 p-6">
          <div className="text-3xl font-bold tracking-tight mb-5">Sign Up</div>
            <p className="mb-3">Verification email has been sent!</p>
            <p className="mb-5">Please check your email to verify your account.</p>
            
            <div className="my-2 h-1 bg-muted" />
            <span>
              Click{" "}
              <Button variant="link" size="sm" className="px-0" asChild>
                <Link href="/">here</Link>
              </Button>{" "}
              to go back to the home page.
            </span>
        </div>
      </div>
    </main>
  );
}