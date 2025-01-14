import { Card } from "@/components/ui/card"
import { Bot, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Agent {
    id: string
    name: string
    description: string
    color: string
}

export function AgentsTab({ projectId }: { projectId: string }) {
    // This would come from your data store
    const agents: Agent[] = [
        {
            id: "resume-reviewer",
            name: "Resume Reviewer",
            description: "Analyzes and improves resumes",
            color: "from-blue-400 to-blue-600",
        },
        {
            id: "interview-coach",
            name: "Interview Coach",
            description: "Prepares for interviews",
            color: "from-purple-400 to-purple-600",
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Project Agents</h2>
                <Button>
                    <Bot className="mr-2 h-4 w-4" /> Create Agent
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((agent) => (
                    <Card key={agent.id} className="p-4">
                        <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${agent.color}`} />
                            <div className="flex-1">
                                <h3 className="font-medium">{agent.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {agent.description}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/agents/${agent.id}`}>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
} 