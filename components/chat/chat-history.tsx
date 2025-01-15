'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Message } from "@/lib/chat"

interface ChatHistoryProps {
    messages: Message[]
}

export function ChatHistory({ messages }: ChatHistoryProps) {
    return (
        <div className="space-y-4 p-4">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>
                            {message.role === 'user' ? 'U' : 'AI'}
                        </AvatarFallback>
                    </Avatar>
                    <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                            }`}
                    >
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    )
} 