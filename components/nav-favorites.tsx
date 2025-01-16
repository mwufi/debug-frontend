"use client"

import { MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Chat {
  id: string
  started_at: string
  last_message_at: string | null
  total_messages: number
  latest_message: string
}

export function NavFavorites() {
  const [chats, setChats] = useState<Chat[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:8000/chats')
      .then(res => res.json())
      .then(data => {
        setChats(data)
      })
      .catch(err => {
        console.error('Failed to fetch chats:', err)
        toast.error('Failed to load chats')
      })
  }, [])

  return (
    <div className="py-2">
      <nav className="grid gap-1 px-2">
        <h2 className="mb-2 px-2 text-sm font-semibold tracking-tight">
          Recent Chats
        </h2>
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => router.push(`/chat/${chat.id}`)}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
              "transition-colors min-w-0"
            )}
          >
            <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
            <div className="min-w-0 flex-1 text-left">
              <div className="font-medium text-xs truncate">Chat {chat.id}</div>
              <div className="text-[10px] text-muted-foreground truncate">
                {chat.latest_message || 'No messages'}
              </div>
            </div>
            {chat.total_messages > 0 && (
              <div className="ml-1.5 text-[10px] text-muted-foreground flex-shrink-0">
                {chat.total_messages}
              </div>
            )}
          </button>
        ))}
        {chats.length === 0 && (
          <div className="px-2 py-1.5 text-xs text-muted-foreground">
            No chats yet
          </div>
        )}
      </nav>
    </div>
  )
}
