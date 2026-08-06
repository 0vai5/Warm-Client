import NavLogo from "@/assets/NavLogo.png"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <img
      src={NavLogo}
      alt="Warm"
      className={cn("h-6 w-auto object-contain", className)}
    />
  )
}

export default Logo