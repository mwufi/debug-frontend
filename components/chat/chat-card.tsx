'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Edit2, Maximize2, Minimize2, MoreHorizontal, Settings } from "lucide-react"
import { useState } from "react"
import { ChatHistory } from "./chat-history"
import { ChatPanel } from "./chat-panel"
import { ChatProvider } from "@/lib/chat-context"
import { useRouter } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ChatCard() {
    const [isExpanded, setIsExpanded] = useState(true)
    const router = useRouter()

    return (
        <ChatProvider>
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center space-y-0 p-4">
                    <div className="flex flex-1 items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">General Chat</h3>
                            <p className="text-sm text-muted-foreground">Active</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push('/settings')}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? (
                                <Minimize2 className="h-4 w-4" />
                            ) : (
                                <Maximize2 className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </CardHeader>
                {isExpanded && (
                    <CardContent className="p-0">
                        <div className="flex h-[calc(100vh-12rem)] flex-col">
                            <ChatPanel showTestMessages={false} />
                        </div>
                    </CardContent>
                )}
            </Card>
        </ChatProvider>
    )
} 