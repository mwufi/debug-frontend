import { SidebarLeft } from "@/components/sidebar-left"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare, Code, Clock } from "lucide-react"

export default function AgentProfile({ params }: { params: { projectId: string } }) {
    return (
        <SidebarProvider>
            <SidebarLeft />
            <SidebarInset>
                <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        Agent Profile
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="p-6 max-w-4xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mx-auto" />
                        <h1 className="text-3xl font-bold">Claude</h1>
                        <p className="text-muted-foreground">
                            Hi there! I'm an AI agent built by{" "}
                            <a href="#" className="text-primary hover:underline">
                                Zen
                            </a>
                            . My purpose is to live and serve!
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                            <MessageSquare className="h-8 w-8 mb-4" />
                            <h2 className="font-semibold mb-2">Start Chatting</h2>
                            <p className="text-sm text-muted-foreground">
                                Jump right in and start a conversation with me
                            </p>
                        </Card>

                        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                            <Code className="h-8 w-8 mb-4" />
                            <h2 className="font-semibold mb-2">View Capabilities</h2>
                            <p className="text-sm text-muted-foreground">
                                Explore what I can do and how I can help
                            </p>
                        </Card>

                        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                            <Clock className="h-8 w-8 mb-4" />
                            <h2 className="font-semibold mb-2">Chat History</h2>
                            <p className="text-sm text-muted-foreground">
                                Browse through our past conversations
                            </p>
                        </Card>
                    </div>

                    {/* Features Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Things to Try</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="p-4">
                                <p className="font-medium">💻 Code Review</p>
                                <p className="text-sm text-muted-foreground">
                                    "Can you review my React component?"
                                </p>
                            </Card>
                            <Card className="p-4">
                                <p className="font-medium">🎨 UI/UX Design</p>
                                <p className="text-sm text-muted-foreground">
                                    "Help me design a landing page"
                                </p>
                            </Card>
                            {/* Add more example cards as needed */}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="p-4 text-center">
                            <p className="text-2xl font-bold">152</p>
                            <p className="text-sm text-muted-foreground">Total Chats</p>
                        </Card>
                        <Card className="p-4 text-center">
                            <p className="text-2xl font-bold">4.9/5</p>
                            <p className="text-sm text-muted-foreground">Average Rating</p>
                        </Card>
                        <Card className="p-4 text-center">
                            <p className="text-2xl font-bold">12ms</p>
                            <p className="text-sm text-muted-foreground">Avg Response Time</p>
                        </Card>
                        <Card className="p-4 text-center">
                            <p className="text-2xl font-bold">24/7</p>
                            <p className="text-sm text-muted-foreground">Availability</p>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
