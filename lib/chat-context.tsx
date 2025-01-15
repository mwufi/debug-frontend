'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Message } from './chat'

interface ChatSettings {
    systemPrompt: string
    personality: string
    hasMemory: boolean
    enabledTools: string[]
}

interface ChatContextType {
    messages: Message[]
    setMessages: (messages: Message[]) => void
    isStreaming: boolean
    setIsStreaming: (isStreaming: boolean) => void
    settings: ChatSettings
    updateSettings: (settings: Partial<ChatSettings>) => void
}

const defaultSettings: ChatSettings = {
    systemPrompt: "You are a helpful AI assistant.",
    personality: "friendly and professional",
    hasMemory: true,
    enabledTools: ["search", "code", "math"]
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

function loadSettings(): ChatSettings {
    if (typeof window === 'undefined') return defaultSettings
    const saved = localStorage.getItem('chatSettings')
    if (!saved) return defaultSettings
    try {
        return JSON.parse(saved)
    } catch {
        return defaultSettings
    }
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([{
        role: 'assistant',
        content: 'Hello! How can I help you today?'
    }])
    const [isStreaming, setIsStreaming] = useState(false)
    const [settings, setSettings] = useState<ChatSettings>(defaultSettings)

    // Load settings from localStorage on mount
    useEffect(() => {
        setSettings(loadSettings())
    }, [])

    // Save settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('chatSettings', JSON.stringify(settings))
    }, [settings])

    const updateSettings = (newSettings: Partial<ChatSettings>) => {
        setSettings(prev => {
            const updated = { ...prev, ...newSettings }
            return updated
        })
    }

    return (
        <ChatContext.Provider value={{
            messages,
            setMessages,
            isStreaming,
            setIsStreaming,
            settings,
            updateSettings
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