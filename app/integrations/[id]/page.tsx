'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { availableIntegrations } from "../page"
import { useState, use } from "react"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface IntegrationConfig {
    [key: string]: string;
}

export default function IntegrationPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const { id } = use(params)
    const integration = availableIntegrations.find(i => i.id === id)
    const [config, setConfig] = useState<IntegrationConfig>({})
    const [isConnected, setIsConnected] = useState(false)

    if (!integration) {
        return (
            <div className="container max-w-2xl mx-auto py-8 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Integration Not Found</CardTitle>
                        <CardDescription>
                            The requested integration does not exist.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push('/integrations')} variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Integrations
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const Icon = integration.icon

    const handleSave = () => {
        // Here you would typically validate and save the configuration
        const requiredFields = integration.configFields || []
        const missingFields = requiredFields.filter(field => !config[field])

        if (missingFields.length > 0) {
            toast.error(`Missing required fields: ${missingFields.join(", ")}`)
            return
        }

        setIsConnected(true)
        toast.success(`${integration.label} configured successfully!`)
    }

    const handleDisconnect = () => {
        setIsConnected(false)
        setConfig({})
        toast.success(`${integration.label} disconnected`)
    }

    return (
        <div className="container max-w-2xl mx-auto py-8 px-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Button
                            onClick={() => router.push('/integrations')}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            "bg-gradient-to-br",
                            integration.gradient
                        )}>
                            <Icon className="w-4 h-4" />
                        </div>
                    </div>
                    <CardTitle>{integration.label} Integration</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!integration.configRequired ? (
                        <div className="text-sm text-muted-foreground">
                            No configuration required. You can enable this integration directly from the integrations page.
                        </div>
                    ) : isConnected ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-500">
                                <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-500" />
                                Connected
                            </div>
                            <Button
                                onClick={handleDisconnect}
                                variant="outline"
                                className="w-full"
                            >
                                Disconnect
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {integration.configFields?.map((field) => (
                                <div key={field} className="space-y-2">
                                    <Label htmlFor={field}>{field}</Label>
                                    <Input
                                        id={field}
                                        type="password"
                                        value={config[field] || ''}
                                        onChange={(e) => setConfig(prev => ({
                                            ...prev,
                                            [field]: e.target.value
                                        }))}
                                        placeholder={`Enter your ${field.toLowerCase()}`}
                                    />
                                </div>
                            ))}
                            <Button
                                onClick={handleSave}
                                className="w-full"
                            >
                                Connect
                            </Button>
                        </div>
                    )}

                    {/* Documentation Section */}
                    <div className="pt-6 border-t">
                        <h3 className="text-sm font-medium mb-2">Documentation</h3>
                        <div className="text-sm text-muted-foreground space-y-2">
                            <p>
                                To get started with {integration.label}, you'll need to:
                            </p>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Visit the {integration.label} developer portal</li>
                                <li>Create a new application</li>
                                <li>Generate the required credentials</li>
                                <li>Enter them in the fields above</li>
                            </ol>
                            <p className="pt-2">
                                For detailed instructions, visit the{' '}
                                <a
                                    href="#"
                                    className="text-primary hover:underline"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toast.info("Documentation coming soon!")
                                    }}
                                >
                                    {integration.label} setup guide
                                </a>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 