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
                                px-4 py-2 max-w-[80%]
                            `}
                        >
                            {message.role === 'assistant' ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    className="prose dark:prose-invert prose-p:my-0 prose-pre:my-2 prose-ul:my-2 prose-ol:my-2 prose-blockquote:my-2 prose-headings:mb-2 prose-headings:mt-4 max-w-none break-words"
                                    components={{
                                        code: ({ children, className, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return match ? (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            ) : (
                                                <code className="bg-secondary/50 px-1 py-0.5 rounded-sm" {...props}>
                                                    {children}
                                                </code>
                                            )
                                        },
                                        pre: ({ children, ...props }) => (
                                            <pre className="bg-secondary/50 p-3 rounded-lg overflow-auto" {...props}>
                                                {children}
                                            </pre>
                                        ),
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
                                </ReactMarkdown>
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