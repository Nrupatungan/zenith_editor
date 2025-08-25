import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/next-auth/auth'
import { getInitials } from '@/lib/utils'
import { MapPin, BadgeCheckIcon } from 'lucide-react'
import TopBar from './_components/top-bar'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from "date-fns"
import EditModalButton from './_components/EditModalButton'
import DeleteButton from './_components/DeleteButton'
import ChangePasswordButton from './_components/ChangePasswordButton'

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
          <Card className='w-sm [box-shadow:5px_10px_35px_oklch(0.606_0.25_292.717)]'>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>

              <CardDescription>Tweak your profile to your tastes.</CardDescription>
              
              <CardAction>
                {user?.isPremium
                  ?
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white dark:bg-blue-600"
                  >
                    <BadgeCheckIcon />
                    Pro
                  </Badge>
                  :
                  <Badge variant="secondary">Regular</Badge>  
                }
              </CardAction>

            </CardHeader>

            <CardContent className='space-y-5'>
              <div className='flex justify-between items-start'>
                <div className='flex gap-3'>
                  <Avatar className='size-20'>
                    <AvatarImage src={user?.image ?? 'https://ui.shadcn.com/avatars/shadcn.jpg'}/>
                    <AvatarFallback>{getInitials(user?.name!)}</AvatarFallback>
                  </Avatar>
                  <div className='pt-2'>
                    <h1 className='text-lg font-bold'>{user?.name}</h1>
                    <p className='text-sm text-muted-foreground font-light tracking-wide'>{user?.email}</p>
                  </div>
                </div>
                <EditModalButton />
              </div>
              
              {/* Added location and join date */}
              <div className="flex items-center justify-between gap-2">
                {user?.location && (
                  <div className="flex flex-none w-[140px] items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{user.location ?? "unknown"}</span>
                  </div>
                )}
                {user?.createdAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Joined: {format(user.createdAt, 'MMM d, yyyy')}</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-md font-semibold">About Me</h3>
                <p className="text-sm text-muted-foreground mt-1">{user?.bio ?? "Please write something about yourself."}</p>
              </div>

            </CardContent>
            
            <CardFooter className='flex-col gap-3'>
              {user?.password && <ChangePasswordButton/>}
              <DeleteButton email={user?.email!} />
            </CardFooter>
          </Card>
        </div>
      </div>
  )
}

export default ProfilePage