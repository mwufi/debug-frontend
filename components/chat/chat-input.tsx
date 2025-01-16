import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"
import { useState } from "react"

interface ChatInputProps {
    onSendMessage: (message: string) => Promise<void>
    isStreaming: boolean
}

export function ChatInput({ onSendMessage, isStreaming }: ChatInputProps) {
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim() || isStreaming) return

        await onSendMessage(message)
        setMessage("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="min-h-[60px] flex-1"
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
        </form>
    )
} 