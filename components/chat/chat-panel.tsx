'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"
import { useState } from "react"

export function ChatPanel() {
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle message submission
        setMessage('')
    }

    return (
        <form onSubmit={handleSubmit} className="border-t bg-background p-4">
            <div className="flex gap-3">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="min-h-[60px] w-full resize-none"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmit(e)
                        }
                    }}
                />
                <Button type="submit" size="icon">
                    <SendHorizontal className="h-4 w-4" />
                </Button>
            </div>
        </form>
    )
} 