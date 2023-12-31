'use client'

import { cn } from "@/lib/utils"
import { UserButton } from "@clerk/nextjs"
import { Menu, ShoppingBag, SparkleIcon } from "lucide-react"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { Button } from "./ui/button"
import { ModeToggle } from "./ModeToggle"
import MobileSidebar from "./MobileSidebar"
import FancyText from '@carefully-coded/react-text-gradient';
import { useProModal } from "@/hooks/UsePro"

const font = Poppins({ subsets: ["latin"],weight: '600' })

interface NavProps {
    isPro: boolean
}

const Nav = ({isPro}: NavProps) => {
    const proModal = useProModal()



  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
        <div className="flex items-center">
            <MobileSidebar isPro={isPro} />
            <Link href='/'>
                <div  className={cn(font.className," hidden md:block text-xl md:text-3xl font-bold text-primary")}>
                    <FancyText
                        gradient={{ from: '#0ea5e9', to: '#d063f1' }}
                        animate
                        animateDuration={5000}
                        >
                        Personify AI
                    </FancyText>
                </div>
                <h1 >
                   
                </h1>
            </Link>
        </div>

        <div className="flex items-center gap-x-3 ">
                <ModeToggle />
                {!isPro && (
                <Button size={"sm"} variant={"fresh"} className="group before:ease relative overflow-hidden transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40" onClick={proModal.onOpen}>
                    <ShoppingBag className=" w-5 h-5 mr-2  group-hover:text-black group-hover:transition group-hover:delay-100" />
                    <span className="group-hover:text-black group-hover:transition group-hover:delay-100 ">
                    Go Premium
                    </span>
                </Button>
                )}
            <UserButton afterSignOutUrl="/" />
        </div>
    </div>
  )
}

export default Nav