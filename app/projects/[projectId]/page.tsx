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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Target, MapPin, Calculator, Bot, MessageSquare, FileText, Clock } from "lucide-react"
import { AgentsTab } from "./_components/agents-tab"
import { FilesTab } from "./_components/files-tab"
import { ConversationsTab } from "./_components/conversations-tab"
import { TimelineTab } from "./_components/timeline-tab"

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
                                        House Hunting Assistant
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="p-6">
                    {/* Project Status Overview */}
                    <Card className="p-6 mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-semibold">House Search Progress</h2>
                                <p className="text-muted-foreground">Started 2 weeks ago • 12 properties viewed</p>
                            </div>
                            <Button>
                                <Target className="mr-2 h-4 w-4" /> Update Criteria
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Current Search Criteria */}
                            <div className="space-y-3">
                                <h3 className="font-medium">Search Criteria</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>San Francisco Bay Area</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Home className="h-4 w-4 text-muted-foreground" />
                                        <span>3+ beds, 2+ baths</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calculator className="h-4 w-4 text-muted-foreground" />
                                        <span>$800k - $1.2M</span>
                                    </div>
                                </div>
                            </div>

                            {/* Top Matches */}
                            <div className="space-y-3">
                                <h3 className="font-medium">Top Matches</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>123 Main St</span>
                                        <span className="text-green-500">92% match</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>456 Oak Ave</span>
                                        <span className="text-green-500">88% match</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>789 Pine Rd</span>
                                        <span className="text-green-500">85% match</span>
                                    </div>
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="space-y-3">
                                <h3 className="font-medium">Next Steps</h3>
                                <div className="space-y-2 text-sm">
                                    <p>• Schedule viewing at 123 Main St</p>
                                    <p>• Review mortgage pre-approval</p>
                                    <p>• Contact agent about Oak Ave listing</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Search Progress</span>
                                <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                        </div>
                    </Card>

                    {/* Active Agents Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="p-4 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <Bot className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Property Analyzer</h3>
                                <p className="text-sm text-muted-foreground">Analyzing 2 new listings</p>
                            </div>
                        </Card>
                        <Card className="p-4 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Calculator className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Finance Assistant</h3>
                                <p className="text-sm text-muted-foreground">Mortgage calculator ready</p>
                            </div>
                        </Card>
                        <Card className="p-4 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <MapPin className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Area Research</h3>
                                <p className="text-sm text-muted-foreground">3 neighborhood reports</p>
                            </div>
                        </Card>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="properties">Properties</TabsTrigger>
                            <TabsTrigger value="agents">Agents</TabsTrigger>
                            <TabsTrigger value="research">Research</TabsTrigger>
                            <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        </TabsList>

                        {/* Tab contents would go here */}
                    </Tabs>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
