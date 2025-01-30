'use client';

import { use } from 'react';
import { Card } from "@/components/ui/card";
import { Activity, MessageSquare, Brain, FolderOpen, Zap, Link2, Settings, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AgentTab {
    id: string;
    label: string;
    icon: any;
}

const agentTabs: AgentTab[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'knowledge', label: 'Knowledge', icon: Brain },
    { id: 'files', label: 'Files', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AgentPage({ params }: { params: { id: string } }) {
    const agentId = use(Promise.resolve(params)).id;
    const router = useRouter();
    const pathname = usePathname();
    const currentTab = pathname.split('/').pop() || 'dashboard';

    // Mock agent data - in real app, fetch this based on agentId
    const agent = {
        id: agentId,
        name: 'Research Assistant',
        avatar: 'https://picsum.photos/200?random=1',
        status: 'online',
        description: 'Specialized in academic research and data analysis',
        socialProfiles: {
            twitter: '@researchai',
            linkedin: 'research-assistant-ai'
        },
        stats: {
            activeConversations: 3,
            tasksCompleted: 150,
            knowledgeBase: '2.5GB',
            uptime: '99.9%'
        }
    };

    return (
        <div className="flex h-screen">
            <TooltipProvider>
                <div className="w-16 border-r bg-background p-3 flex flex-col gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push('/agents')}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    {agentTabs.map((tab) => {
                        const isActive = currentTab === tab.id;
                        return (
                            <Tooltip key={tab.id}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "w-10 h-10",
                                            isActive && "bg-accent text-accent-foreground"
                                        )}
                                        onClick={() => router.push(`/agents/${agentId}/${tab.id}`)}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {tab.label}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </TooltipProvider>

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={agent.avatar}
                            alt={agent.name}
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white bg-green-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{agent.name}</h1>
                        <p className="text-muted-foreground">{agent.description}</p>
                    </div>
                </div>

                <Card className="p-6">
                    {currentTab === 'dashboard' && (
                        <div className="grid grid-cols-4 gap-4">
                            {Object.entries(agent.stats).map(([key, value]) => (
                                <Card key={key} className="p-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </h3>
                                    <p className="text-2xl font-bold">{value}</p>
                                </Card>
                            ))}
                        </div>
                    )}
                    {currentTab === 'messages' && (
                        <p className="text-muted-foreground">Messages content coming soon...</p>
                    )}
                    {currentTab === 'knowledge' && (
                        <p className="text-muted-foreground">Knowledge base content coming soon...</p>
                    )}
                    {currentTab === 'files' && (
                        <p className="text-muted-foreground">Files management content coming soon...</p>
                    )}
                    {currentTab === 'skills' && (
                        <p className="text-muted-foreground">Skills content coming soon...</p>
                    )}
                    {currentTab === 'integrations' && (
                        <p className="text-muted-foreground">Integrations content coming soon...</p>
                    )}
                    {currentTab === 'settings' && (
                        <p className="text-muted-foreground">Settings content coming soon...</p>
                    )}
                </Card>
            </div>
        </div>
    );
}