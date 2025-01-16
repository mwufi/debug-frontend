import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatEvent } from "@/lib/chat"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

interface DebugPanelProps {
    events: ChatEvent[]
}

interface CollapsedEvent {
    type: string
    timestamp: string
    count: number
    events: ChatEvent[]
    isCollapsed?: boolean
}

function EventCard({ event, isCollapsed, onToggle }: { event: CollapsedEvent, isCollapsed: boolean, onToggle: () => void }) {
    const getEventColor = (type: string) => {
        switch (type) {
            case 'connect':
            case 'agent_joined':
                return 'bg-green-500'
            case 'disconnect':
            case 'agent_left':
                return 'bg-red-500'
            case 'tool_use_called':
                return 'bg-blue-500'
            case 'text_delta':
                return 'bg-gray-500'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <Card className="p-3 mb-2">
            <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className={cn("text-white", getEventColor(event.type))}>
                    {event.type}
                </Badge>
                {event.count > 1 && (
                    <Badge variant="outline" className="text-xs">
                        {event.count} events
                    </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                </span>
                {event.count > 1 && (
                    <button
                        onClick={onToggle}
                        className="ml-auto text-muted-foreground hover:text-foreground"
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                )}
            </div>
            {event.type === 'text_delta' && event.count > 1 && !isCollapsed && (
                <div className="mt-2 space-y-2">
                    {event.events.map((e, i) => (
                        <div key={i} className="text-sm text-muted-foreground pl-2 border-l">
                            {e.delta}
                        </div>
                    ))}
                </div>
            )}
            {event.type === 'tool_use_called' && (
                <div className="mt-2">
                    <div className="text-sm font-medium">{event.events[0].name}</div>
                    <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-x-auto">
                        {JSON.stringify(event.events[0].args, null, 2)}
                    </pre>
                </div>
            )}
            {event.events[0].agent_id && (
                <div className="text-sm text-muted-foreground mt-1">
                    Agent: {event.events[0].agent_id}
                </div>
            )}
        </Card>
    )
}

export function DebugPanel({ events }: DebugPanelProps) {
    const [collapsedStates, setCollapsedStates] = useState<{ [key: string]: boolean }>({})

    // Group consecutive events of the same type
    const groupedEvents = events.reduce<CollapsedEvent[]>((acc, event) => {
        const lastEvent = acc[0]

        if (lastEvent && lastEvent.type === event.type) {
            // Update the existing group
            lastEvent.count++
            lastEvent.events.push(event)
        } else {
            // Create a new group
            acc.unshift({
                type: event.type,
                timestamp: event.timestamp,
                count: 1,
                events: [event]
            })
        }

        return acc
    }, [])

    const toggleCollapse = (index: number) => {
        setCollapsedStates(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div className="h-full flex flex-col">
            <div className="px-4 py-2 border-b">
                <h3 className="font-semibold">Debug Panel</h3>
                <p className="text-sm text-muted-foreground">Real-time event log</p>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-2">
                    {groupedEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            event={event}
                            isCollapsed={collapsedStates[index] ?? true}
                            onToggle={() => toggleCollapse(index)}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
} 