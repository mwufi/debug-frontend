'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import MessageTrace from "@/components/chat/MessageTrace";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: Date;
    agentName?: string;
    trace?: {
        context: any;
        memory: any;
        knowledge: any;
        reasoning: string[];
    };
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hello! I'm Agent Smith. How can I help you today?",
            sender: 'agent',
            timestamp: new Date(),
            agentName: 'Smith',
            trace: {
                context: {
                    sessionStart: true,
                    userHistory: null,
                },
                memory: {
                    working: { greeting: "formal" },
                    retrieved: []
                },
                knowledge: {
                    rules: ["Start with formal greeting"],
                    facts: ["New conversation"]
                },
                reasoning: [
                    "New session detected",
                    "No user history found",
                    "Applying formal greeting protocol",
                    "Generating welcome message"
                ]
            }
        },
        {
            id: '2',
            content: "Hi! Can you help me understand how you make decisions?",
            sender: 'user',
            timestamp: new Date(),
        }
    ]);

    const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

    return (
        <Card className="flex flex-col h-[800px]">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className="space-y-2">
                            <div
                                className={cn(
                                    "flex gap-3 max-w-[80%]",
                                    message.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <Avatar>
                                    <AvatarImage
                                        src={message.sender === 'user'
                                            ? "/user-avatar.png"
                                            : `/agents/${message.agentName?.toLowerCase()}.png`
                                        }
                                    />
                                    <AvatarFallback>
                                        {message.sender === 'user' ? 'U' : message.agentName?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="group relative">
                                    <div className="text-sm text-muted-foreground mb-1">
                                        {message.sender === 'user' ? 'You' : message.agentName}
                                    </div>
                                    <div
                                        className={cn(
                                            "rounded-lg p-3",
                                            message.sender === 'user'
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        {message.content}
                                        {message.trace && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="opacity-0 group-hover:opacity-100 absolute -bottom-7 left-0 text-xs"
                                                onClick={() => setExpandedMessage(
                                                    expandedMessage === message.id ? null : message.id
                                                )}
                                            >
                                                {expandedMessage === message.id ? 'Hide Trace' : 'Show Trace'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {expandedMessage === message.id && message.trace && (
                                <MessageTrace trace={message.trace} />
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 border-t">
                <form className="flex gap-2">
                    <Input
                        placeholder="Type a message..."
                        className="flex-1"
                    />
                    <Button type="submit">Send</Button>
                </form>
            </div>
        </Card>
    );
} 