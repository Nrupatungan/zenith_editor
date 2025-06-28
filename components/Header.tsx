import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type HeaderProps = {
    children: ReactNode,
    className?: string,
}

const Header = ({children, className}: HeaderProps) => {
  return (
    <h1 className={cn("text-2xl md:text-3xl underline underline-offset-6 font-semibold", className)}>{children}</h1>
  )
}

export default Header