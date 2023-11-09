'use client'

import { useProModal } from "@/hooks/UsePro"
import { cn } from "@/lib/utils"
import { Home, Plus,Settings, SmilePlus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SidebarProps {
    isPro: boolean
}
const Sidebar = ({isPro}: SidebarProps) => {
    const routes = [
    {
        icon: Home,
        href: '/',
        label: 'Home',
        pro: false
    },
    {
        icon: SmilePlus,
        href: '/companion/new',
        label: 'Create',
        pro: true
    },
    {
        icon: Settings,
        href: '/settings',
        label: 'Settings',
        pro: false
    },
]
const pathname = usePathname()
const router = useRouter()
const proModal = useProModal()

const onNavigate = (url: string,pro:boolean) => {
    if(pro && !isPro){
        return proModal.onOpen()
    }
    return router.push(url)
}
  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
        <div className="p-3 flex-1 justify-center flex">
            <div className="space-y-2">
                
                {routes.map((item) => (
                    <div key={item.href} onClick={() => onNavigate(item.href,item.pro)} className={cn('text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                    pathname === item.href && 'bg-primary/10 text-primary'
                    )}>
                        <div className="flex flex-col gap-y-2 items-center flex-1">
                            <item.icon  className="h-5 w-5"/>
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar