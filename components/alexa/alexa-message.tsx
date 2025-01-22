"use client"

import { ActionButtons } from "./action-buttons"

interface AlexaMessageProps {
    content: string
    timestamp: string
}

export function AlexaMessage({ content, timestamp }: AlexaMessageProps) {
    // Calculate time elapsed
    const timeElapsed = ((new Date().getTime() - new Date(timestamp).getTime()) / 1000).toFixed(2)

    return (
        <div className="relative group flex flex-col justify-center w-full max-w-3xl md:px-4 pb-2 my-2 lg:w-4/5 message-row items-start">
            <div className="rounded-3xl prose dark:prose-invert break-words w-full max-w-none py-3">
                <p className="break-words" style={{ whiteSpace: "pre-wrap" }}>
                    {content}
                </p>
            </div>
            <ActionButtons
                position="start"
                actions={["regenerate", "copy", "share", "thumbsUp", "thumbsDown"]}
                timeElapsed={`${timeElapsed}s`}
            />
        </div>
    )
} 