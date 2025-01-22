"use client"

import { ToolUseMessage } from "@/components/alexa/tool-use-message"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TestPage() {
    const [bgColor, setBgColor] = useState<string>("bg-muted")
    const sampleToolUseData = {
        id: "test-1",
        tool: "codebase_search",
        input: {
            query: "find components related to chat",
            explanation: "Searching for chat components"
        },
        status: "success" as const,
        timestamp: new Date().toISOString()
    }

    const backgroundOptions = [
        { name: "Light Grey", value: "bg-muted" },
        { name: "White", value: "bg-white" },
        { name: "Dark", value: "bg-slate-800" },
        { name: "Blue Grey", value: "bg-slate-100" },
    ]

    return (
        <div className="container py-8 space-y-8 mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Component Test Page</h1>
                <div className="flex gap-2">
                    {backgroundOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant={bgColor === option.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setBgColor(option.value)}
                        >
                            {option.name}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl">ToolUseMessage Tests</h2>

                <div className="space-y-4">
                    <div className={`${bgColor} p-6 rounded-lg flex justify-center`}>
                        <div className="w-[600px]">
                            <ToolUseMessage {...sampleToolUseData} />
                        </div>
                    </div>

                    <div className={`${bgColor} p-6 rounded-lg flex justify-center`}>
                        <div className="w-[600px]">
                            <ToolUseMessage
                                id="test-2"
                                tool="edit_file"
                                input={{
                                    target_file: "app/test/page.tsx",
                                    instructions: "Creating a test file",
                                    code_edit: "console.log('test')"
                                }}
                                status="in_progress"
                            />
                        </div>
                    </div>

                    <div className={`${bgColor} p-6 rounded-lg flex justify-center`}>
                        <div className="w-[600px]">
                            <ToolUseMessage
                                id="test-3"
                                tool="run_terminal_cmd"
                                input={{
                                    command: "ls -la",
                                    explanation: "List directory contents"
                                }}
                                status="failed"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 