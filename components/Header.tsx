import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type HeaderProps = {
    children: ReactNode,
    className?: string,
}

const Header = ({children, className}: HeaderProps) => {
  return (
    <h1 className={cn("text-4xl sm:text-5xl underline underline-offset-8 font-semibold mb-3", className)}>{children}</h1>
  )
}

export default Header