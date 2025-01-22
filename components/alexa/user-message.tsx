"use client"

import { ActionButtons } from "./action-buttons"

interface UserMessageProps {
    content: string
}

export function UserMessage({ content }: UserMessageProps) {
    return (
        <div className="relative group flex flex-col justify-center w-full max-w-3xl md:px-4 pb-4 my-2 lg:w-4/5 message-row items-end">
            <div className="rounded-3xl prose dark:prose-invert break-words bg-secondary max-w-[100%] sm:max-w-[70%] px-4 py-2.5 rounded-br-xl">
                <span className="whitespace-pre-wrap">{content}</span>
            </div>
            <ActionButtons
                position="end"
                actions={["edit", "copy"]}
            />
        </div>
    )
} 