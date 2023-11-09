'use client'

import { cn } from "@/lib/utils"
import { useToast } from "./ui/use-toast"
import {useTheme} from 'next-themes'
import BotAvatar from "./BotAvatar"
import {PulseLoader} from 'react-spinners'
import UserAvatar from "./UserAvatar"
import { Button } from "./ui/button"
import { ClipboardCheck, ClipboardCopy, Copy, CopyCheck } from "lucide-react"
import { useState } from "react"

export interface ChatMessageProps {
    role: 'system' | 'user'
    content?: string
    isLoading?: boolean
    src?: string
}

const ChatMessage = ({role, content, isLoading, src}: ChatMessageProps) => {
    const {toast} = useToast()
    const {theme} = useTheme()
    const [isCopied, setIsCopied] = useState(false)


    const onCopy = () => {
        if(!content) {
            return
        }

        navigator.clipboard.writeText(content)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
          }, 5000)
        toast({
            title: "Copied",
            description: "Copied to clipboard",
            variant: 'default'
        })
    }
  return (
    <div className={cn('group flex items-start gap-x-3 py-4 w-full',
    role === 'user' && 'justify-end'
    )}>
    {role !== 'user' && src && <BotAvatar src={src} />}
        <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10 ">
            {
                isLoading ? 
                <PulseLoader 
                color={theme === "light" ? "black" : "white"}
                speedMultiplier={1}
                size={5}
                /> : content
            }
        </div>
        {role === 'user' && <UserAvatar />}
        {role !== 'user' && !isLoading &&(
            <Button
            onClick={onCopy}
            className="opacity-0 group-hover:opacity-100 transition"
            size={'icon'}
            variant={'ghost'}
            title="Copy to clipboard"

            >
            {isCopied ? <CopyCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </Button>
        )}
    </div>
  )
}

export default ChatMessage