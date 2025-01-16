'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Message } from "@/lib/chat"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatHistoryProps {
    messages: Message[]
}

export function ChatHistory({ messages }: ChatHistoryProps) {
    return (
        <div className="space-y-2 p-4">
            {messages.map((message, index) => {
                const isUser = message.role === 'user'
                const isFirstInGroup = index === 0 || messages[index - 1].role !== message.role
                const isLastInGroup = index === messages.length - 1 || messages[index + 1].role !== message.role

                return (
                    <div
                        key={index}
                        className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
                    >
                        {isLastInGroup && !isUser && (
                            <Avatar className="h-6 w-6 mt-auto">
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        )}
                        {isLastInGroup && isUser && (
                            <Avatar className="h-6 w-6 mt-auto">
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        )}
                        <div
                            className={`
                                ${!isUser ? 'mr-12' : 'ml-12'}
                                ${isFirstInGroup ? (isUser ? 'rounded-t-2xl' : 'rounded-t-2xl') : ''}
                                ${isLastInGroup ? (isUser ? 'rounded-bl-2xl' : 'rounded-br-2xl') : ''}
                                ${!isFirstInGroup && !isLastInGroup ? '' : ''}
                                ${isUser ? 'bg-primary text-primary-foreground rounded-l-2xl' : 'bg-muted rounded-r-2xl'}
                                px-4 py-2 max-w-[80%] whitespace-pre-wrap
                            `}
                        >
                            {message.role === 'assistant' ? (
                                message.content
                            ) : (
                                message.content
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
} 