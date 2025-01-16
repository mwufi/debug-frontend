'use client'

import { SidebarLeft } from "@/components/sidebar-left"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChatCard } from "@/components/chat/chat-card"
import { ThemeToggle } from "@/components/theme-toggle"
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
        <SidebarProvider>
            <SidebarLeft />
            <SidebarInset>
                <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        Chat {conversation?.total_messages ? `(${conversation.total_messages} messages)` : ''}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="mx-4">
                        <ThemeToggle />
                    </div>
                </header>
                <div className="p-4">
                    <ChatCard conversation={conversation} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
