"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

export interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: string
}

interface AlexaChatContextType {
    messages: Message[]
    sendUserMessage: (content: string) => Promise<void>
    switchChat: (chatId: string) => void
    currentChatId: string | null
}

const AlexaChatContext = createContext<AlexaChatContextType | null>(null)

export function AlexaChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [currentChatId, setCurrentChatId] = useState<string | null>(null)

    const sendUserMessage = useCallback(async (content: string) => {
        const userMessage: Message = {
            id: crypto.randomUUID(),
            content,
            role: 'user',
            timestamp: new Date().toISOString()
        }

        setMessages(prev => [...prev, userMessage])

        // TODO: Implement actual API call here
        // For now, simulate a response
        const assistantMessage: Message = {
            id: crypto.randomUUID(),
            content: "This is a simulated response. Replace with actual API integration.",
            role: 'assistant',
            timestamp: new Date().toISOString()
        }

        setTimeout(() => {
            setMessages(prev => [...prev, assistantMessage])
        }, 1000)
    }, [])

    const switchChat = useCallback((chatId: string) => {
        setCurrentChatId(chatId)
        setMessages([]) // Clear messages when switching chats
        // TODO: Fetch messages for the new chat ID
    }, [])

    return (
        <AlexaChatContext.Provider value={{
            messages,
            sendUserMessage,
            switchChat,
            currentChatId
        }}>
            {children}
        </AlexaChatContext.Provider>
    )
}

export function useAlexaChat() {
    const context = useContext(AlexaChatContext)
    if (!context) {
        throw new Error("useAlexaChat must be used within an AlexaChatProvider")
    }
    return [context.messages, context.sendUserMessage, context.switchChat] as const
} 