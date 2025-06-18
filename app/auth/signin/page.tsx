import { signIn } from "@/lib/next-auth/auth";

export default function SignInPage() {
    return (
      <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit">Sign in</button>
    </form>
    )
  }