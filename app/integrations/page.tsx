'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Twitter, Search, Globe, Youtube, Github, Newspaper, Instagram, Mail, Music, MessageSquare, BookOpen, Linkedin, Calendar, FileText, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"

const availableIntegrations = [
    {
        id: "twitter",
        label: "Twitter/X",
        description: "Connect to Twitter to search tweets and engage with the community",
        icon: Twitter,
        gradient: "from-blue-500/20 to-sky-500/20",
        hoverGradient: "hover:from-blue-500/30 hover:to-sky-500/30",
        configRequired: true,
        configFields: ["API Key", "API Secret"]
    },
    {
        id: "instagram",
        label: "Instagram",
        description: "Access Instagram posts, stories, and engage with followers",
        icon: Instagram,
        gradient: "from-pink-500/20 to-purple-500/20",
        hoverGradient: "hover:from-pink-500/30 hover:to-purple-500/30",
        configRequired: true,
        configFields: ["Access Token"]
    },
    {
        id: "tiktok",
        label: "TikTok",
        description: "Create and analyze TikTok content, track trends",
        icon: Music,
        gradient: "from-black/20 to-zinc-500/20",
        hoverGradient: "hover:from-black/30 hover:to-zinc-500/30",
        configRequired: true,
        configFields: ["Client Key", "Client Secret"]
    },
    {
        id: "gmail",
        label: "Gmail",
        description: "Read and compose emails, manage your inbox",
        icon: Mail,
        gradient: "from-red-500/20 to-yellow-500/20",
        hoverGradient: "hover:from-red-500/30 hover:to-yellow-500/30",
        configRequired: true,
        configFields: ["OAuth Credentials"]
    },
    {
        id: "google",
        label: "Google Search",
        description: "Access real-time search results and knowledge from the web",
        icon: Search,
        gradient: "from-blue-500/20 to-green-500/20",
        hoverGradient: "hover:from-blue-500/30 hover:to-green-500/30",
        configRequired: true,
        configFields: ["API Key", "Search Engine ID"]
    },
    {
        id: "browser",
        label: "Web Browser",
        description: "Browse and interact with websites directly",
        icon: Globe,
        gradient: "from-indigo-500/20 to-purple-500/20",
        hoverGradient: "hover:from-indigo-500/30 hover:to-purple-500/30",
        configRequired: false
    },
    {
        id: "youtube",
        label: "YouTube",
        description: "Search and analyze YouTube video content",
        icon: Youtube,
        gradient: "from-red-500/20 to-pink-500/20",
        hoverGradient: "hover:from-red-500/30 hover:to-pink-500/30",
        configRequired: true,
        configFields: ["API Key"]
    },
    {
        id: "github",
        label: "GitHub",
        description: "Access repositories and analyze code",
        icon: Github,
        gradient: "from-gray-500/20 to-slate-500/20",
        hoverGradient: "hover:from-gray-500/30 hover:to-slate-500/30",
        configRequired: true,
        configFields: ["Personal Access Token"]
    },
    {
        id: "slack",
        label: "Slack",
        description: "Send messages and interact with Slack workspaces",
        icon: MessageSquare,
        gradient: "from-purple-500/20 to-violet-500/20",
        hoverGradient: "hover:from-purple-500/30 hover:to-violet-500/30",
        configRequired: true,
        configFields: ["Bot Token", "Signing Secret"]
    },
    {
        id: "notion",
        label: "Notion",
        description: "Create and manage Notion pages and databases",
        icon: BookOpen,
        gradient: "from-stone-500/20 to-neutral-500/20",
        hoverGradient: "hover:from-stone-500/30 hover:to-neutral-500/30",
        configRequired: true,
        configFields: ["Integration Token"]
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        description: "Connect with professionals and share content",
        icon: Linkedin,
        gradient: "from-blue-600/20 to-sky-600/20",
        hoverGradient: "hover:from-blue-600/30 hover:to-sky-600/30",
        configRequired: true,
        configFields: ["Client ID", "Client Secret"]
    },
    {
        id: "calendar",
        label: "Google Calendar",
        description: "Schedule and manage events and meetings",
        icon: Calendar,
        gradient: "from-cyan-500/20 to-blue-500/20",
        hoverGradient: "hover:from-cyan-500/30 hover:to-blue-500/30",
        configRequired: true,
        configFields: ["OAuth Credentials"]
    },
    {
        id: "docs",
        label: "Google Docs",
        description: "Create and edit documents collaboratively",
        icon: FileText,
        gradient: "from-blue-400/20 to-indigo-400/20",
        hoverGradient: "hover:from-blue-400/30 hover:to-indigo-400/30",
        configRequired: true,
        configFields: ["OAuth Credentials"]
    },
    {
        id: "news",
        label: "News API",
        description: "Get real-time news from various sources",
        icon: Newspaper,
        gradient: "from-emerald-500/20 to-teal-500/20",
        hoverGradient: "hover:from-emerald-500/30 hover:to-teal-500/30",
        configRequired: true,
        configFields: ["API Key"]
    },
    {
        id: "asana",
        label: "Asana",
        description: "Manage tasks and projects in Asana",
        icon: Briefcase,
        gradient: "from-orange-500/20 to-red-500/20",
        hoverGradient: "hover:from-orange-500/30 hover:to-red-500/30",
        configRequired: true,
        configFields: ["Personal Access Token"]
    }
]

export default function IntegrationsPage() {
    const router = useRouter()
    const [enabledIntegrations, setEnabledIntegrations] = useState<string[]>([])

    const handleIntegrationClick = (integration: typeof availableIntegrations[0]) => {
        if (integration.configRequired) {
            router.push(`/integrations/${integration.id}`)
        } else {
            toggleIntegration(integration.id)
        }
    }

    const toggleIntegration = (integrationId: string) => {
        if (enabledIntegrations.includes(integrationId)) {
            setEnabledIntegrations(prev => prev.filter(id => id !== integrationId))
            toast.success(`${integrationId} integration disabled`)
        } else {
            setEnabledIntegrations(prev => [...prev, integrationId])
            toast.success(`${integrationId} integration enabled`)
        }
    }

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <Card>
                <CardHeader>
                    <CardTitle>AI Integrations</CardTitle>
                    <CardDescription>
                        Connect your AI assistant with various services and APIs
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {availableIntegrations.map((integration) => {
                            const isEnabled = enabledIntegrations.includes(integration.id)
                            const Icon = integration.icon
                            return (
                                <button
                                    key={integration.id}
                                    onClick={() => handleIntegrationClick(integration)}
                                    className={cn(
                                        "relative h-32 rounded-xl p-4 text-left transition-all",
                                        "outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        "bg-gradient-to-br",
                                        isEnabled
                                            ? integration.gradient
                                            : "from-transparent to-transparent hover:bg-accent/10",
                                        integration.hoverGradient
                                    )}
                                >
                                    <div className="relative z-10 h-full flex flex-col">
                                        <Icon className={cn(
                                            "h-6 w-6 mb-2 transition-colors",
                                            isEnabled ? "text-foreground" : "text-muted-foreground"
                                        )} />
                                        <div className={cn(
                                            "font-medium mb-1 transition-colors",
                                            isEnabled ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {integration.label}
                                        </div>
                                        <p className={cn(
                                            "text-xs transition-colors line-clamp-2",
                                            isEnabled ? "text-foreground/90" : "text-muted-foreground/60"
                                        )}>
                                            {integration.description}
                                        </p>
                                        {integration.configRequired && (
                                            <div className="absolute bottom-0 right-0 p-1.5">
                                                <div className="text-xs text-muted-foreground/40">
                                                    Configure →
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button onClick={() => router.push('/')} variant="outline" className="flex-1">
                            Back
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export { availableIntegrations } 