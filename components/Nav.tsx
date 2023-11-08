'use client'

import { cn } from "@/lib/utils"
import { UserButton } from "@clerk/nextjs"
import { Menu, SparkleIcon } from "lucide-react"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { Button } from "./ui/button"
import { ModeToggle } from "./ModeToggle"

const font = Poppins({ subsets: ["latin"],weight: '600' })

const Nav = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
        <div className="flex items-center">
            <Menu  className="md:hidden block"/>
            <Link href='/'>
                <h1 className={cn(font.className,"hidden md:block text-xl md:text-3xl font-bold text-primary")}>
                    Personify AI
                </h1>
            </Link>
        </div>

        <div className="flex items-center gap-x-3 group">
                <ModeToggle />
                <Button size={"sm"} variant={"fresh"}>
                    <span className="group-hover:text-black">
                    Go Premium
                    </span>
                    <SparkleIcon className="h-4 w-4 ml-2 fill-white text-white group-hover:fill-black group-hover:text-black" />
                </Button>
            <UserButton />
        </div>
    </div>
  )
}

export default Nav