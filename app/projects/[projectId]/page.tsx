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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, MessageSquare, FileText, Timeline, Plus, Users } from "lucide-react"

export default function ProjectPage({ params }: { params: { projectId: string } }) {
    return (
        <SidebarProvider>
            <SidebarLeft />
            <SidebarInset>
                <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background border-b">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1 text-xl font-semibold">
                                        Job Application Assistant
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="p-6">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Active for 7 days • Last updated 2h ago</p>
                        </div>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Resource
                        </Button>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="agents">Agents</TabsTrigger>
                            <TabsTrigger value="conversations">Conversations</TabsTrigger>
                            <TabsTrigger value="files">Files</TabsTrigger>
                            <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Bot className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Active Agents</p>
                                    </div>
                                    <p className="text-2xl font-bold mt-2">4</p>
                                </Card>
                                <Card className="p-4">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Conversations</p>
                                    </div>
                                    <p className="text-2xl font-bold mt-2">12</p>
                                </Card>
                                <Card className="p-4">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Files</p>
                                    </div>
                                    <p className="text-2xl font-bold mt-2">8</p>
                                </Card>
                                <Card className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Collaborators</p>
                                    </div>
                                    <p className="text-2xl font-bold mt-2">2</p>
                                </Card>
                            </div>

                            {/* Active Agents */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Active Agents</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card className="p-4 flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
                                        <div>
                                            <h3 className="font-medium">Resume Reviewer</h3>
                                            <p className="text-sm text-muted-foreground">Analyzes and improves resumes</p>
                                        </div>
                                    </Card>
                                    <Card className="p-4 flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600" />
                                        <div>
                                            <h3 className="font-medium">Interview Coach</h3>
                                            <p className="text-sm text-muted-foreground">Prepares for interviews</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                                <Card>
                                    <div className="divide-y">
                                        <div className="p-4">
                                            <p className="text-sm">Resume Reviewer analyzed "resume_v2.pdf"</p>
                                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm">Interview Coach completed mock interview session</p>
                                            <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm">Added new job description for analysis</p>
                                            <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Other tab contents would go here */}
                    </Tabs>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
