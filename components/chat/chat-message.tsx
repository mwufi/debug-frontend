import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
    role: string
    content: string
    timestamp: Date
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
    const isAssistant = role === "assistant"

    return (
        <div className={cn(
            "flex gap-3 mb-4",
            isAssistant ? "flex-row" : "flex-row-reverse"
        )}>
            <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback>{isAssistant ? "AI" : "U"}</AvatarFallback>
            </Avatar>
            <div className={cn(
                "flex flex-col",
                isAssistant ? "items-start" : "items-end"
            )}>
                <div className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%]",
                    isAssistant ? "bg-secondary" : "bg-primary text-primary-foreground"
                )}>
                    {content}
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                    {timestamp.toLocaleTimeString()}
                </span>
            </div>
        </div>
    )
} 