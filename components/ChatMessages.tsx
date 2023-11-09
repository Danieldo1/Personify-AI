'use client'

import {Companion} from "@prisma/client"
import ChatMessage, { ChatMessageProps } from "./ChatMessage"
import { ElementRef, useEffect, useRef, useState } from "react"

interface ChatMessagesProps {
    messages: ChatMessageProps[]
    isLoading: boolean
    companion: Companion
}

const ChatMessages = ({messages=[],isLoading,companion}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<'div'>>(null)


  const [botLoading, setBotLoading] = useState(messages.length === 0 ? true : false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBotLoading(false)
    }, 2000)
    return () => clearTimeout(timeout)
  },[])

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: 'smooth'})
  },[messages.length])
  return (
    <div className="flex-1 overflow-y-auto pr-4">
        <ChatMessage
        isLoading={botLoading}
        src={companion.src}
        role="system"
        content={`Hello there! I'm ${companion.name},${companion.description}`}
         />
      {/* User Messages */}
      {messages.map((message) => (
        <ChatMessage 
        key={message.content}
        role={message.role}
        content={message.content}
        src={message.src}
        
        />
      ))}

      {/* Loading box for bot */}
      {isLoading && (
        <ChatMessage 
        role="system"
        src={companion.src}
        isLoading
        />
      )}

      {/* Scroll to bottom of chat */}

        <div ref={scrollRef} />
        
    </div>
  )
}

export default ChatMessages