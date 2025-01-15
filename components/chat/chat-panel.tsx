'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendHorizontal } from "lucide-react"
import { useState, useRef } from "react"
import { Message, streamChat } from "@/lib/chat"
import { useParams } from "next/navigation"
import { ChatHistory } from "@/components/chat/chat-history"
import { useChatContext } from "@/lib/chat-context"

interface ChatPanelProps {
    showTestMessages: boolean
}

export function ChatPanel({ showTestMessages }: ChatPanelProps) {
    const [message, setMessage] = useState('')
    const { messages, setMessages, isStreaming, setIsStreaming } = useChatContext()
    const params = useParams()
    const chatId = params.chatId as string
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim() || isStreaming) return

        // Add user message
        const userMessage: Message = { role: 'user', content: message }
        setMessages([...messages, userMessage])

        // Add empty assistant message that will be streamed
        const assistantMessage: Message = { role: 'assistant', content: '' }
        setMessages([...messages, userMessage, assistantMessage])

        setMessage('')
        setIsStreaming(true)

        try {
            let content = ''
            await streamChat(chatId, message, (chunk) => {
                content += chunk
                setMessages((prev: Message[]) => {
                    const newMessages = [...prev]
                    newMessages[newMessages.length - 1] = {
                        role: 'assistant',
                        content
                    }
                    return newMessages
                })
            })
        } catch (error) {
            console.error('Error streaming chat:', error)
        } finally {
            setIsStreaming(false)
            // Focus the textarea after streaming completes
            textareaRef.current?.focus()
        }
    }

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1">
                <ChatHistory messages={messages} />
            </ScrollArea>

            <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSubmit(e)
                            }
                        }}
                    />
                    <Button type="submit" size="icon" disabled={isStreaming}>
                        <SendHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
} 