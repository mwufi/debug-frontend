"use client"

import { useAlexaChat } from "@/components/alexa/alexa-chat-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function WebSocketTestPage() {
    const { wsSendMessage, wsConnected, wsError } = useAlexaChat()
    const [lastError, setLastError] = useState<string | null>(null)

    const handleSendMessage = async (type: string, data?: any) => {
        try {
            setLastError(null)
            await wsSendMessage(type, data)
        } catch (error) {
            setLastError(error instanceof Error ? error.message : 'Unknown error occurred')
        }
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{wsConnected ? 'Connected' : 'Disconnected'}</span>
            </div>

            {(wsError || lastError) && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                    {wsError || lastError}
                </div>
            )}

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Test WebSocket Events</h2>

                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() => handleSendMessage('a')}
                        variant="outline"
                    >
                        Send 'a' (Ping/Pong)
                    </Button>

                    <Button
                        onClick={() => handleSendMessage('b')}
                        variant="outline"
                    >
                        Send 'b' (Stream Text)
                    </Button>

                    <Button
                        onClick={() => handleSendMessage('c')}
                        variant="outline"
                    >
                        Send 'c' (Start/Stop)
                    </Button>

                    <Button
                        onClick={() => handleSendMessage('user_message', 'Hello from WebSocket!')}
                        variant="outline"
                    >
                        Send User Message
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-500">
                    Check the browser console to see the WebSocket responses
                </p>
            </div>
        </div>
    )
}
