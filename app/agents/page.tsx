'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Activity, MessageSquare, Brain, FolderOpen, Zap, Link2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Agent {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'busy';
    description: string;
    socialProfiles: {
        twitter?: string;
        linkedin?: string;
    };
    activeConversations: number;
    lastActive: string;
}

const mockAgents: Agent[] = [
    {
        id: '1',
        name: 'Research Assistant',
        avatar: 'https://picsum.photos/200?random=1',
        status: 'online',
        description: 'Specialized in academic research and data analysis',
        socialProfiles: {
            twitter: '@researchai',
            linkedin: 'research-assistant-ai'
        },
        activeConversations: 3,
        lastActive: '2 minutes ago'
    },
    {
        id: '2',
        name: 'Customer Support',
        avatar: 'https://picsum.photos/200?random=2',
        status: 'busy',
        description: 'Handles customer inquiries and support tickets',
        socialProfiles: {
            twitter: '@supportai'
        },
        activeConversations: 5,
        lastActive: 'Just now'
    }
];

export default function AgentsPage() {
    const [agents] = useState<Agent[]>(mockAgents);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold">Agents</h1>
                    <p className="text-sm text-muted-foreground">Monitor agent status and performance</p>
                </div>
                <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Agent
                </Button>
            </div>

            <Card>
                <div className="divide-y">
                    {agents.map((agent) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="p-4 hover:bg-muted/50 transition-colors relative group cursor-pointer"
                        >
                            <div className="flex items-center justify-between relative">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <img
                                            src={agent.avatar}
                                            alt={agent.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${agent.status === 'online' ? 'bg-green-500' : agent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'}`}
                                        />
                                    </div>
                                    <div>
                                        <Link href={`/agents/${agent.id}`}>
                                            <h3 className="font-medium transition-colors">{agent.name}</h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                            <span>{agent.activeConversations}</span>
                                        </div>
                                        <div className="text-muted-foreground">
                                            {agent.lastActive}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 relative z-10">
                                        <Button variant="ghost" size="icon">
                                            <Activity className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Settings className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    );
}