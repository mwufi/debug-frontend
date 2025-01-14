'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
}

export function ChatHistory() {
    // This would normally come from your state management
    const messages: Message[] = [
        {
            id: '1',
            content: 'Hello! How can I help you today?',
            role: 'assistant',
            timestamp: new Date(),
        },
        // Add more messages as needed
    ]

    return (
        <div className="space-y-4 p-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''
                        }`}
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