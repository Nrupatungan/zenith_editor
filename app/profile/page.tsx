import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { auth } from '@/lib/next-auth/auth'
import { getInitials } from '@/lib/utils'
import { Edit2, StarIcon } from 'lucide-react'
import TopBar from './_components/top-bar'
import prisma from '@/lib/prisma'

async function ProfilePage() {
  const session = await auth();
  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id
    }
  })
  return (
      <div className='container mx-auto px-7 overflow-hidden relative'>
        <div className='min-h-screen grid place-items-center'>
          <TopBar/>
          <Card className='w-sm'>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>

              <CardDescription>Tweak your profile to your tastes.</CardDescription>
              
              <CardAction>
                <Tooltip>
                  <TooltipTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3">
                    <Edit2/>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              </CardAction>

            </CardHeader>
            <CardContent>
              <div className='flex gap-4'>
                <Avatar className='size-20'>
                  <AvatarImage src={session?.user?.image ?? 'https://ui.shadcn.com/avatars/shadcn.jpg'}/>
                  <AvatarFallback>{getInitials(session?.user?.name ?? "John doe")}</AvatarFallback>
                </Avatar>
                <div className='pt-2'>
                  <h1 className='text-lg font-bold'>{session?.user?.name}</h1>
                  <p className='text-sm text-muted-foreground font-light tracking-wide'>{session?.user?.email}</p>
                </div>
              </div>
              
              {user?.isPremium && <div className='mt-5 overflow-x-clip'>
                <div className='bg-gradient-to-r from-emerald-300 to-sky-400 -rotate-3 -mx-1'>
                  <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className='flex flex-none gap-4 py-1.5 pr-4 animate-move-left'>
                      <span className='uppercase font-extrabold'>premium user</span>  
                      <StarIcon className='size-6'/>
                    </div>
                  </div>
                </div>
              </div>}
            </CardContent>
            <CardFooter>

            </CardFooter>
          </Card>
        </div>
      </div>
  )
}

export default ProfilePage