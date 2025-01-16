'use client'

import { ChatCard } from "@/components/chat/chat-card"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

interface Message {
    role: string
    content: string
    timestamp: string
}

interface Conversation {
    id: string
    messages: Message[]
    started_at: string
    last_message_at: string | null
    total_messages: number
}

export default function ChatPage() {
    const params = useParams()
    const chatId = params.chatId as string
    const [conversation, setConversation] = useState<Conversation | null>(null)

    useEffect(() => {
        // Fetch conversation data
        fetch(`http://localhost:8000/chat/${chatId}`)
            .then(res => res.json())
            .then(data => {
                setConversation(data)
            })
            .catch(err => {
                toast.error("Failed to load conversation")
                console.error(err)
            })
    }, [chatId])

    return (
        <ChatCard conversation={conversation} />
    )
}
