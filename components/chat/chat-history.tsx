'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Message } from "@/lib/chat"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

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
                        {message.role === 'assistant' ? <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            className="prose prose-sm max-w-none break-words whitespace-pre-wrap"
                            components={{
                                code: ({ children, className, ...props }) => {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return match ? (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <code className="bg-secondary px-1 py-0.5 rounded-sm" {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        {children}
                                    </a>
                                )
                            }}
                        >
                            {message.content}
                        </ReactMarkdown> : message.content}
                    </div>
                </div>
            ))}
        </div>
    )
} 