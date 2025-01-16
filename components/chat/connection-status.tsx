import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ConnectionStatusProps {
    isConnected: boolean
    hasAgent: boolean
}

export function ConnectionStatus({ isConnected, hasAgent }: ConnectionStatusProps) {
    return (
        <div className="flex items-center gap-2">
            <Badge
                variant="secondary"
                className={cn(
                    "text-white",
                    isConnected ? "bg-green-500" : "bg-red-500"
                )}
            >
                {isConnected ? "Connected" : "Disconnected"}
            </Badge>
            {isConnected && (
                <Badge
                    variant="secondary"
                    className={cn(
                        "text-white",
                        hasAgent ? "bg-blue-500" : "bg-gray-500"
                    )}
                >
                    {hasAgent ? "Agent Active" : "Agent Idle"}
                </Badge>
            )}
        </div>
    )
} 