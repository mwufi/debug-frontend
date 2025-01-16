'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatHistory } from "./chat-history"
import { ChatInput } from "./chat-input"
import { Message, streamChat } from "@/lib/chat"
import { useChatContext } from "@/lib/chat-context"
import { useEffect } from "react"
import { useParams } from "next/navigation"

interface Conversation {
    id: string
    messages: Message[]
    started_at: string
    last_message_at: string | null
    total_messages: number
}

interface ChatPanelProps {
    conversation: Conversation | null
}

export function ChatPanel({ conversation }: ChatPanelProps) {
    const { messages, setMessages, isStreaming, setIsStreaming } = useChatContext()
    const params = useParams()
    const chatId = params.chatId as string

    // Initialize messages from conversation if available
    useEffect(() => {
        if (conversation?.messages) {
            setMessages(conversation.messages)
        }
    }, [conversation, setMessages])

    const handleSendMessage = async (message: string) => {
        if (!message.trim() || isStreaming) return

        // Add user message
        const userMessage: Message = { role: 'user', content: message }
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)

        setIsStreaming(true)

        try {
            let content = ''
            const assistantMessage: Message = { role: 'assistant', content: '' }

            // Add empty assistant message that will be streamed
            const messagesWithAssistant = [...updatedMessages, assistantMessage]
            setMessages(messagesWithAssistant)

            await streamChat(chatId, message, (chunk) => {
                content += chunk
                const latestMessages = [...messagesWithAssistant]
                latestMessages[latestMessages.length - 1] = {
                    role: 'assistant',
                    content
                }
                setMessages(latestMessages)
            })
        } catch (error) {
            console.error('Error streaming chat:', error)
        } finally {
            setIsStreaming(false)
        }
    }

    return (
        <>
            <ScrollArea className="flex-1 p-4">
                <ChatHistory messages={messages} />
            </ScrollArea>
            <div className="border-t p-4">
                <ChatInput onSendMessage={handleSendMessage} isStreaming={isStreaming} />
            </div>
        </>
    )
} 