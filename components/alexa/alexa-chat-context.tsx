"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from "react"
import { WebSocketService } from "@/lib/websocket-service"
import { useHotkeys } from "react-hotkeys-hook"
import { SystemPromptModal } from "./system-prompt-modal"

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
    wsSendMessage: (type: string, data?: any) => Promise<void>
    wsConnected: boolean
    wsError: string | null
    systemPrompt: string
}

const AlexaChatContext = createContext<AlexaChatContextType | null>(null)

export function AlexaChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [currentChatId, setCurrentChatId] = useState<string | null>(null)
    const [wsConnected, setWsConnected] = useState(false)
    const [wsError, setWsError] = useState<string | null>(null)
    const [isSystemPromptOpen, setIsSystemPromptOpen] = useState(false)
    const [systemPrompt, setSystemPrompt] = useState("")

    // Add hotkey for system prompt
    useHotkeys('Esc', () => setIsSystemPromptOpen(true), [])

    // Handle system prompt save
    const handleSystemPromptSave = useCallback(async (prompt: string) => {
        try {
            await wsRef.current?.sendMessage('set_system_prompt', prompt)
            setSystemPrompt(prompt)
        } catch (error) {
            console.error('Failed to update system prompt:', error)
        }
    }, [])

    // Handle all WebSocket messages in one place
    const handleWebSocketMessage = useCallback((message: any) => {
        console.log('WebSocket message received:', message)

        switch (message.type) {
            case 'text_delta':
                // Update the last assistant message with the new delta
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.role === 'assistant') {
                        const updatedMessages = [...prev];
                        updatedMessages[updatedMessages.length - 1] = {
                            ...lastMessage,
                            content: lastMessage.content + message.delta
                        };
                        return updatedMessages;
                    }
                    return prev;
                });
                break
            case 'system_prompt':
                setSystemPrompt(message.prompt)
                break
            case 'start':
                console.log('Started message:', message.id)
                break
            case 'stop':
                console.log('Stopped message:', message.id)
                break
            case 'error':
                console.error('WebSocket error:', message.data)
                setWsError(message.data)
                break
            case 'ping':
                // Respond to ping with pong
                wsRef.current?.sendMessage('pong')
                break
            case 'pong':
                // Server responded to our ping
                console.debug('Received pong from server')
                break
            case 'raw':
                // Handle raw non-JSON messages
                console.debug('Received raw message:', message.data)
                break
            default:
                // Handle any other message type
                console.debug('Received message of type:', message.type, message)
        }
    }, [])

    const wsRef = useRef<WebSocketService>(new WebSocketService('ws://127.0.0.1:8000/ws', handleWebSocketMessage))

    useEffect(() => {
        // Initialize WebSocket service
        const ws = wsRef.current
        if (!ws) return

        let reconnectInterval: NodeJS.Timeout | null = null

        const connectWithRetry = async () => {
            try {
                await ws.connect()
                // Clear reconnect interval if connection successful
                if (reconnectInterval) {
                    clearInterval(reconnectInterval)
                    reconnectInterval = null
                }
                setWsError(null)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to connect to WebSocket'
                setWsError(errorMessage)
                // Start reconnection attempts if not already trying
                if (!reconnectInterval) {
                    reconnectInterval = setInterval(connectWithRetry, 3000)
                }
            }
        }

        // Initial connection attempt
        connectWithRetry()

        // Update connection status and handle reconnection
        const checkConnection = setInterval(() => {
            if (ws) {
                const isConnected = ws.isConnected
                setWsConnected(isConnected)

                // If disconnected and not already trying to reconnect, start reconnection attempts
                if (!isConnected && !reconnectInterval) {
                    reconnectInterval = setInterval(connectWithRetry, 3000)
                }
            }
        }, 1000)

        return () => {
            clearInterval(checkConnection)
            if (reconnectInterval) {
                clearInterval(reconnectInterval)
            }
            if (ws) {
                ws.disconnect()
            }
        }
    }, [handleWebSocketMessage]) // Add handleWebSocketMessage to dependencies

    const sendUserMessage = useCallback(async (content: string) => {
        const userMessage: Message = {
            id: crypto.randomUUID(),
            content,
            role: 'user',
            timestamp: new Date().toISOString()
        }

        const assistantMessage: Message = {
            id: crypto.randomUUID(),
            content: '',
            role: 'assistant',
            timestamp: new Date().toISOString()
        }

        setMessages(prev => [...prev, userMessage, assistantMessage])

        try {
            // Send message through WebSocket
            if (!wsRef.current) {
                throw new Error('WebSocket connection not initialized')
            }
            await wsRef.current.sendMessage('user_message', content)
            setWsError(null)
        } catch (error) {
            setWsError(error instanceof Error ? error.message : 'Failed to send message')
            throw error
        }
    }, [])

    const wsSendMessage = useCallback(async (type: string, data?: any) => {
        try {
            if (!wsRef.current) {
                throw new Error('WebSocket connection not initialized')
            }
            await wsRef.current.sendMessage(type, data)
            setWsError(null)
        } catch (error) {
            setWsError(error instanceof Error ? error.message : 'Failed to send message')
            throw error
        }
    }, [])

    const switchChat = useCallback((chatId: string) => {
        setCurrentChatId(chatId)
        setMessages([]) // Clear messages when switching chats
    }, [])

    return (
        <AlexaChatContext.Provider value={{
            messages,
            sendUserMessage,
            switchChat,
            currentChatId,
            wsSendMessage,
            wsConnected,
            wsError,
            systemPrompt
        }}>
            {children}
            <SystemPromptModal
                open={isSystemPromptOpen}
                onOpenChange={setIsSystemPromptOpen}
                initialPrompt={systemPrompt}
                onSave={handleSystemPromptSave}
            />
        </AlexaChatContext.Provider>
    )
}

export function useAlexaChat() {
    const context = useContext(AlexaChatContext)
    if (!context) {
        throw new Error("useAlexaChat must be used within an AlexaChatProvider")
    }
    return context
} 