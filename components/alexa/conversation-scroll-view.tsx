"use client"

import { AlexaMessage } from "./alexa-message"
import { UserMessage } from "./user-message"

interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: string
}

export function ConversationScrollView() {
    // This would typically come from a state management solution or API
    const messages: Message[] = [
        {
            id: '1',
            content: 'Hello! How can I help you today?',
            role: 'assistant',
            timestamp: new Date().toISOString()
        },
        {
            id: '2',
            content: 'Can you tell me a story?',
            role: 'user',
            timestamp: new Date().toISOString()
        }
    ]

    return (
        <div className="flex flex-col h-full relative items-center">
            <div className="w-full h-full overflow-y-auto flex flex-col items-center px-5 pb-[157px]">
                <div className="relative w-full flex flex-col items-center pt-16 pb-4">
                    {messages.map((message) => (
                        message.role === 'assistant' ? (
                            <AlexaMessage
                                key={message.id}
                                content={message.content}
                                timestamp={message.timestamp}
                            />
                        ) : (
                            <UserMessage
                                key={message.id}
                                content={message.content}
                            />
                        )
                    ))}
                </div>
            </div>
        </div>
    )
} 