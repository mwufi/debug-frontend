'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatHistory } from "./chat-history"
import { ChatInput } from "./chat-input"
import { Message, WebSocketChat, ChatEvent } from "@/lib/chat"
import { useChatContext } from "@/lib/chat-context"
import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { DebugPanel } from "./debug-panel"
import { ConnectionStatus } from "./connection-status"
import { Button } from "@/components/ui/button"
import { PanelRightOpen, RotateCcw } from "lucide-react"

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
    const wsRef = useRef<WebSocketChat | null>(null)
    const currentMessageRef = useRef<string>('')
    const [events, setEvents] = useState<ChatEvent[]>([])
    const [isConnected, setIsConnected] = useState(false)
    const [hasAgent, setHasAgent] = useState(false)
    const [showDebug, setShowDebug] = useState(false)
    const initializedRef = useRef(false)

    // Only set initial messages once when the component mounts
    useEffect(() => {
        if (!initializedRef.current && conversation?.messages) {
            initializedRef.current = true
            setMessages(conversation.messages)
        }
    }, [conversation, setMessages])

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocketChat(chatId, handleWebSocketMessage)
        wsRef.current = ws
        ws.connect()

        return () => {
            ws.disconnect()
        }
    }, [chatId])

    const handleWebSocketMessage = (event: ChatEvent) => {
        // Add event to history
        setEvents(prev => [event, ...prev])

        switch (event.type) {
            case 'connect':
                setIsConnected(true)
                break
            case 'disconnect':
                setIsConnected(false)
                setHasAgent(false)
                break
            case 'message_received':
                // Message has been received by the server
                break
            case 'convo-reset':
                setMessages([])
                toast.success('Conversation reset')
                break
            case 'text_delta':
                if (event.delta) {
                    currentMessageRef.current += event.delta
                    setMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1]
                        if (lastMessage?.role === 'assistant') {
                            return [
                                ...prevMessages.slice(0, -1),
                                {
                                    ...lastMessage,
                                    content: currentMessageRef.current,
                                    timestamp: event.timestamp
                                }
                            ]
                        } else {
                            return [
                                ...prevMessages,
                                {
                                    role: 'assistant',
                                    content: currentMessageRef.current,
                                    timestamp: event.timestamp
                                }
                            ]
                        }
                    })
                }
                break
            case 'tool_use_called':
                toast.info(`Tool used: ${event.name}`, {
                    description: JSON.stringify(event.args, null, 2)
                })
                break
            case 'agent_joined':
                setIsStreaming(true)
                setHasAgent(true)
                currentMessageRef.current = ''
                break
            case 'agent_left':
                setIsStreaming(false)
                setHasAgent(false)
                break
        }
    }

    const handleSendMessage = async (message: string) => {
        if (!message.trim() || isStreaming) return

        // Add user message
        const userMessage: Message = {
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
        }
        setMessages(prevMessages => [...prevMessages, userMessage])

        // Send message through WebSocket
        wsRef.current?.sendMessage(message)
    }

    const handleReset = () => {
        if (wsRef.current) {
            wsRef.current.send({
                type: 'convo-reset'
            })
        }
    }

    return (
        <div className="flex h-full">
            <div className="flex-1 flex flex-col">
                <div className="px-4 py-2 border-b flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <ConnectionStatus isConnected={isConnected} hasAgent={hasAgent} />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleReset}
                            title="Reset conversation"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowDebug(!showDebug)}
                        className={showDebug ? 'bg-muted' : ''}
                    >
                        <PanelRightOpen className="h-4 w-4" />
                    </Button>
                </div>
                <ScrollArea className="flex-1 p-4">
                    <ChatHistory messages={messages} />
                </ScrollArea>
                <div className="p-4 border-t">
                    <ChatInput onSendMessage={handleSendMessage} isStreaming={isStreaming} />
                </div>
            </div>
            {showDebug && (
                <div className="w-96 border-l">
                    <DebugPanel events={events} />
                </div>
            )}
        </div>
    )
} 