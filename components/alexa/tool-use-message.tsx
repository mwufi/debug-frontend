"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolUseMessageProps {
    id: string
    tool: string
    input: Record<string, any>
    status: "in_progress" | "success" | "failed"
    timestamp?: string
}

export function ToolUseMessage({ id, tool, input, status, timestamp }: ToolUseMessageProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="relative group flex flex-col justify-center w-full max-w-3xl md:px-4 lg:w-4/5 message-row items-start">
            <div className={cn(
                "flex items-center gap-2 text-sm text-muted-foreground/75 py-1",
                status === "in_progress" && "text-muted-foreground",
                status === "success" && "text-green-500/75",
                status === "failed" && "text-destructive/75"
            )}>
                {status === "in_progress" && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>
                    {status === "in_progress" && "Calling"}
                    {status === "success" && "Success:"}
                    {status === "failed" && "Failed to call"}
                    {" "}
                    <code className="bg-muted/50 px-1 py-0.5 rounded-md text-xs">{tool}</code>
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto h-6 w-6 p-0 hover:bg-muted/50"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
            </div>
            {isExpanded && (
                <div className="w-full mt-1 pl-4">
                    <pre className="text-xs bg-muted/50 p-2 rounded-md overflow-x-auto whitespace-pre">
                        <code>{JSON.stringify(input, null, 2)}</code>
                    </pre>
                    {timestamp && (
                        <p className="text-xs text-muted-foreground/50 mt-1">
                            {new Date(timestamp).toLocaleString()}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
} 