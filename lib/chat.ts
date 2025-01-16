export type Message = {
    role: 'user' | 'assistant'
    content: string
    timestamp?: string
}

export type ChatEvent = {
    type: 'connect' | 'disconnect' | 'message_received' | 'text_delta' | 'tool_use_called' | 'agent_joined' | 'agent_left' | 'convo-reset'
    timestamp: string
    chat_id?: string
    content?: string
    delta?: string
    agent_id?: string
    name?: string
    id?: string
    args?: any
}

export class WebSocketChat {
    private ws: WebSocket | null = null
    private chatId: string
    private messageCallback: (event: ChatEvent) => void
    private url: string

    constructor(chatId: string, onMessage: (event: ChatEvent) => void) {
        this.chatId = chatId
        this.messageCallback = onMessage
        this.url = `ws://localhost:8000/v2/chat/${chatId}`
    }

    connect() {
        if (this.ws) {
            this.ws.close()
        }

        this.ws = new WebSocket(this.url)

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as ChatEvent
                this.messageCallback(data)
            } catch (error) {
                console.error('Error parsing WebSocket message:', error)
            }
        }

        this.ws.onclose = () => {
            console.log('WebSocket connection closed')
            // Attempt to reconnect after a delay
            setTimeout(() => this.connect(), 5000)
        }

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error)
        }
    }

    sendMessage(content: string) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'message',
                content
            }))
        } else {
            console.error('WebSocket is not connected')
        }
    }

    send(data: any) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data))
        } else {
            console.error('WebSocket is not connected')
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close()
            this.ws = null
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