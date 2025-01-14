import { Card } from "@/components/ui/card"
import {
    MessageSquare,
    FileText,
    Bot,
    CheckCircle2,
    AlertCircle,
    Calendar
} from "lucide-react"

interface TimelineEvent {
    id: string
    type: 'chat' | 'file' | 'agent' | 'milestone' | 'alert'
    title: string
    description: string
    timestamp: string
    status?: 'success' | 'warning' | 'info'
}

export function TimelineTab() {
    const events: TimelineEvent[] = [
        {
            id: "1",
            type: "milestone",
            title: "Resume Review Completed",
            description: "All suggested changes have been implemented",
            timestamp: "2h ago",
            status: "success"
        },
        {
            id: "2",
            type: "chat",
            title: "Mock Interview Session",
            description: "Completed technical interview practice with Interview Coach",
            timestamp: "5h ago"
        },
        {
            id: "3",
            type: "file",
            title: "New File Added",
            description: "uploaded resume_v2.pdf",
            timestamp: "1d ago"
        },
        {
            id: "4",
            type: "alert",
            title: "Upcoming Interview",
            description: "Scheduled technical interview with Google tomorrow",
            timestamp: "1d ago",
            status: "warning"
        },
        {
            id: "5",
            type: "agent",
            title: "New Agent Added",
            description: "Interview Coach joined your project",
            timestamp: "3d ago"
        },
    ]

    const getIcon = (type: TimelineEvent['type'], status?: TimelineEvent['status']) => {
        switch (type) {
            case 'chat':
                return <MessageSquare className="h-4 w-4" />
            case 'file':
                return <FileText className="h-4 w-4" />
            case 'agent':
                return <Bot className="h-4 w-4" />
            case 'milestone':
                return <CheckCircle2 className="h-4 w-4 text-green-500" />
            case 'alert':
                return <AlertCircle className="h-4 w-4 text-yellow-500" />
            default:
                return <Calendar className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">Project Timeline</h2>

            <div className="relative space-y-4">
                <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border" />

                {events.map((event) => (
                    <div key={event.id} className="relative flex gap-4">
                        <div className={`h-14 w-14 rounded-full bg-background border flex items-center justify-center z-10`}>
                            {getIcon(event.type, event.status)}
                        </div>
                        <Card className="flex-1 p-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium">{event.title}</h3>
                                <span className="text-sm text-muted-foreground">
                                    {event.timestamp}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {event.description}
                            </p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
} 