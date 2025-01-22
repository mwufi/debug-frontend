"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface SystemPromptModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialPrompt?: string
    onSave: (prompt: string) => void
}

export function SystemPromptModal({
    open,
    onOpenChange,
    initialPrompt = "",
    onSave,
}: SystemPromptModalProps) {
    const [prompt, setPrompt] = useState(initialPrompt)

    useEffect(() => {
        setPrompt(initialPrompt)
    }, [initialPrompt])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-full h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Edit System Prompt</DialogTitle>
                    <DialogDescription>
                        Modify the system prompt to change how the AI assistant behaves.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 min-h-0">
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="h-full resize-none font-mono"
                        placeholder="Enter system prompt..."
                    />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        onSave(prompt)
                        onOpenChange(false)
                    }}>
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
} 