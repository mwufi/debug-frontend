'use client'

import { createContext, useContext, useState } from 'react'
import { Message } from './chat'

interface ChatContextType {
    messages: Message[]
    setMessages: (messages: Message[]) => void
    isStreaming: boolean
    setIsStreaming: (isStreaming: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([{
        role: 'assistant',
        content: 'Hello! How can I help you today?'
    }])
    const [isStreaming, setIsStreaming] = useState(false)

    return (
        <ChatContext.Provider value={{
            messages,
            setMessages,
            isStreaming,
            setIsStreaming
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChatContext() {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider')
    }
    return context
} 