'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useChatContext } from "@/lib/chat-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Search, Code2, Calculator, Database, Image } from "lucide-react"
import { cn } from "@/lib/utils"

const availableTools = [
    {
        id: "search",
        label: "Web Search",
        description: "Search the internet for current information",
        icon: Search,
        gradient: "from-blue-500/20 to-cyan-500/20",
        hoverGradient: "hover:from-blue-500/30 hover:to-cyan-500/30",
    },
    {
        id: "code",
        label: "Code Analysis",
        description: "Analyze and explain code in detail",
        icon: Code2,
        gradient: "from-amber-500/20 to-orange-500/20",
        hoverGradient: "hover:from-amber-500/30 hover:to-orange-500/30",
    },
    {
        id: "math",
        label: "Math Calculations",
        description: "Perform complex mathematical calculations",
        icon: Calculator,
        gradient: "from-green-500/20 to-emerald-500/20",
        hoverGradient: "hover:from-green-500/30 hover:to-emerald-500/30",
    },
    {
        id: "data",
        label: "Data Processing",
        description: "Process and analyze data sets",
        icon: Database,
        gradient: "from-purple-500/20 to-pink-500/20",
        hoverGradient: "hover:from-purple-500/30 hover:to-pink-500/30",
    },
    {
        id: "image",
        label: "Image Generation",
        description: "Generate and edit images",
        icon: Image,
        gradient: "from-rose-500/20 to-red-500/20",
        hoverGradient: "hover:from-rose-500/30 hover:to-red-500/30",
    }
]

export default function SettingsPage() {
    const { settings, updateSettings } = useChatContext()
    const [localSettings, setLocalSettings] = useState(settings)
    const router = useRouter()

    useEffect(() => {
        // Fetch settings on component mount
        fetch('http://localhost:8000/settings')
            .then(res => res.json())
            .then(data => {
                setLocalSettings(data)
                updateSettings(data)
            })
            .catch(err => {
                toast.error("Failed to load settings")
                console.error(err)
            })
    }, [])

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8000/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(localSettings)
            })

            if (!response.ok) throw new Error('Failed to save settings')

            const updatedSettings = await response.json()
            updateSettings(updatedSettings)
            toast.success("Settings saved successfully!")
            router.push('/')
        } catch (error) {
            toast.error("Failed to save settings")
            console.error(error)
        }
    }

    const toggleTool = (toolId: string) => {
        setLocalSettings(prev => ({
            ...prev,
            enabledTools: prev.enabledTools.includes(toolId)
                ? prev.enabledTools.filter(t => t !== toolId)
                : [...prev.enabledTools, toolId]
        }))
    }

    return (
        <div className="container max-w-2xl mx-auto py-8 px-4">
            <Card>
                <CardHeader>
                    <CardTitle>Chat Settings</CardTitle>
                    <CardDescription>
                        Customize your AI assistant's behavior and capabilities
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* System Prompt */}
                    <div className="space-y-2">
                        <Label htmlFor="systemPrompt">Instructions</Label>
                        <Textarea
                            id="systemPrompt"
                            value={localSettings.systemPrompt}
                            onChange={(e) => setLocalSettings(prev => ({ ...prev, systemPrompt: e.target.value }))}
                            placeholder="Give specific instructions to the AI about how it should behave..."
                            className="min-h-[100px]"
                        />
                        <p className="text-sm text-muted-foreground">
                            These instructions guide how the AI behaves and what role it should take.
                        </p>
                    </div>

                    {/* Personality */}
                    <div className="space-y-2">
                        <Label htmlFor="personality">Personality Style</Label>
                        <Input
                            id="personality"
                            value={localSettings.personality}
                            onChange={(e) => setLocalSettings(prev => ({ ...prev, personality: e.target.value }))}
                            placeholder="e.g., friendly and professional, technical expert, casual and fun"
                        />
                        <p className="text-sm text-muted-foreground">
                            Define the tone and style of the AI's responses.
                        </p>
                    </div>

                    {/* Memory Switch */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="memory">Conversation Memory</Label>
                            <p className="text-sm text-muted-foreground">
                                Keep track of the conversation context and previous messages.
                            </p>
                        </div>
                        <Switch
                            id="memory"
                            checked={localSettings.hasMemory}
                            onCheckedChange={(checked) => setLocalSettings(prev => ({ ...prev, hasMemory: checked }))}
                        />
                    </div>

                    {/* Tools */}
                    <div className="space-y-4">
                        <Label>Available Tools</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {availableTools.map((tool) => {
                                const isEnabled = localSettings.enabledTools.includes(tool.id)
                                const Icon = tool.icon
                                return (
                                    <button
                                        key={tool.id}
                                        onClick={() => toggleTool(tool.id)}
                                        className={cn(
                                            "relative h-32 rounded-xl p-4 text-left transition-all",
                                            "outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            "bg-gradient-to-br",
                                            isEnabled
                                                ? tool.gradient
                                                : "from-transparent to-transparent hover:bg-accent/10",
                                            tool.hoverGradient
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
                                                {tool.label}
                                            </div>
                                            <p className={cn(
                                                "text-xs transition-colors line-clamp-2",
                                                isEnabled ? "text-foreground/90" : "text-muted-foreground/60"
                                            )}>
                                                {tool.description}
                                            </p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button onClick={() => router.push('/')} variant="outline" className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="flex-1">
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 