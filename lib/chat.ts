export type Message = {
    role: 'user' | 'assistant'
    content: string
    timestamp?: string
}

export type ChatEvent = {
    type: 'connect' | 'disconnect' | 'message_received' | 'text_delta' | 'tool_use_called' | 'agent_joined' | 'agent_left' | 'convo-reset' | 'error'
    timestamp: string
    chat_id?: string
    content?: string
    delta?: string
    agent_id?: string
    name?: string
    id?: string
    args?: any
    error?: string
    details?: string
}

export class WebSocketChat {
    private static instance: WebSocketChat | null = null
    private ws: WebSocket | null = null
    private chatId: string
    private messageCallback: (event: ChatEvent) => void
    private url: string = 'ws://localhost:8000/v2/chat'
    private retryCount: number = 0
    private maxRetries: number = 5
    private isConnecting: boolean = false
    private messageQueue: any[] = []

    private constructor(chatId: string, onMessage: (event: ChatEvent) => void) {
        this.chatId = chatId
        this.messageCallback = onMessage
    }

    static getInstance(chatId: string, onMessage: (event: ChatEvent) => void): WebSocketChat {
        if (!WebSocketChat.instance) {
            WebSocketChat.instance = new WebSocketChat(chatId, onMessage)
        } else {
            // Update the callback but keep the same instance
            WebSocketChat.instance.messageCallback = onMessage
        }
        return WebSocketChat.instance
    }

    connect() {
        if (this.ws?.readyState === WebSocket.OPEN) {
            // If already connected, just switch to the new chat
            this.switchChat(this.chatId)
            return
        }

        if (this.isConnecting) {
            return // Already trying to connect
        }

        if (this.ws) {
            this.ws.close()
            this.ws = null
        }

        this.isConnecting = true
        this.ws = new WebSocket(this.url)

        this.ws.onopen = () => {
            this.isConnecting = false
            this.retryCount = 0 // Reset retry count on successful connection

            // Send initial chat ID after connection
            this.switchChat(this.chatId)

            // Process any queued messages
            while (this.messageQueue.length > 0) {
                const data = this.messageQueue.shift()
                this.send(data)
            }
        }

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as ChatEvent
                this.messageCallback(data)
            } catch (error) {
                console.error('Error parsing WebSocket message:', error)
                this.messageCallback({
                    type: 'error',
                    error: 'Failed to parse message',
                    timestamp: new Date().toISOString()
                })
            }
        }

        this.ws.onclose = () => {
            this.isConnecting = false
            this.ws = null

            // Only notify if this wasn't a clean shutdown
            if (this.retryCount < this.maxRetries) {
                this.messageCallback({
                    type: 'disconnect',
                    timestamp: new Date().toISOString(),
                    chat_id: this.chatId
                })

                // Implement exponential backoff for retries
                const backoffTime = Math.min(1000 * Math.pow(2, this.retryCount), 10000)
                this.retryCount++
                setTimeout(() => this.connect(), backoffTime)
            }
        }

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error)
            this.messageCallback({
                type: 'error',
                error: 'WebSocket connection error',
                timestamp: new Date().toISOString()
            })
        }
    }

    switchChat(newChatId: string) {
        this.chatId = newChatId
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'switch_chat',
                chat_id: newChatId
            }))
        } else {
            // Queue the switch chat message if not connected
            this.messageQueue.push({
                type: 'switch_chat',
                chat_id: newChatId
            })
            this.connect()
        }
    }

    send(data: any) {
        const messageWithChatId = {
            ...data,
            chat_id: this.chatId
        }

        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(messageWithChatId))
        } else {
            // Queue message if not connected
            this.messageQueue.push(messageWithChatId)
            this.connect()
        }
    }

    sendMessage(content: string) {
        this.send({
            type: 'message',
            content
        })
    }

    disconnect() {
        this.retryCount = this.maxRetries // Prevent reconnection attempts
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
    }

    static cleanup() {
        if (WebSocketChat.instance) {
            WebSocketChat.instance.disconnect()
            WebSocketChat.instance = null
        }
    }
}

// Legacy SSE implementation kept for reference
export async function streamChat(chatId: string, message: string, onChunk: (chunk: string) => void) {
    try {
        const response = await fetch(`http://localhost:8000/chat/${chatId}/push`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const reader = response.body?.getReader()
        if (!reader) {
            throw new Error('No reader available')
        }

        const decoder = new TextDecoder()

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6))
                        onChunk(data.content)
                    } catch (e) {
                        console.error('Error parsing SSE data:', e)
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
} 