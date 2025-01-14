import { Card } from "@/components/ui/card"
import { MessageSquare, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Conversation {
    id: string
    title: string
    lastMessage: string
    participants: string[]
    updatedAt: string
    unread?: boolean
}

export function ConversationsTab() {
    const conversations: Conversation[] = [
        {
            id: "mock-interview-1",
            title: "Mock Interview - Software Engineer",
            lastMessage: "Let's review your performance in the system design question",
            participants: ["Interview Coach", "You"],
            updatedAt: "2h ago",
            unread: true,
        },
        {
            id: "resume-review-1",
            title: "Resume Review Session",
            lastMessage: "I've highlighted areas where we can improve your experience section",
            participants: ["Resume Reviewer", "You"],
            updatedAt: "1d ago",
        },
        {
            id: "job-analysis-1",
            title: "Job Description Analysis",
            lastMessage: "Here's how your skills align with the requirements",
            participants: ["Job Matcher", "You"],
            updatedAt: "2d ago",
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Conversations</h2>
                <Button>
                    <MessageSquare className="mr-2 h-4 w-4" /> New Chat
                </Button>
            </div>

            <div className="space-y-4">
                {conversations.map((conversation) => (
                    <Link key={conversation.id} href={`/chat/${conversation.id}`}>
                        <Card className={`p-4 hover:shadow-md transition-shadow ${conversation.unread ? 'border-primary' : ''}`}>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">{conversation.title}</h3>
                                    <span className="text-sm text-muted-foreground">
                                        {conversation.updatedAt}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                    {conversation.lastMessage}
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex -space-x-2">
                                        {conversation.participants.map((participant) => (
                                            <div
                                                key={participant}
                                                className="h-6 w-6 rounded-full border-2 border-background"
                                            >
                                                {participant === "You" ? (
                                                    <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center">
                                                        <User className="h-3 w-3" />
                                                    </div>
                                                ) : (
                                                    <div className="h-full w-full rounded-full bg-secondary flex items-center justify-center">
                                                        <Bot className="h-3 w-3" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-muted-foreground">
                                        {conversation.participants.join(", ")}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
} 