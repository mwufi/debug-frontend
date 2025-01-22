"use client"

import { AlexaMessage } from "./alexa-message"
import { UserMessage } from "./user-message"
import { ToolUseMessage } from "./tool-use-message"
import { useAlexaChat } from "./alexa-chat-context"

export function ConversationScrollView() {
    const { messages } = useAlexaChat()

    return (
        <div className="flex flex-col h-full relative items-center">
            <div className="w-full h-full overflow-y-auto flex flex-col items-center px-5 pb-[157px]">
                <div key="conversation-scroll" className="relative w-full flex flex-col items-center pt-20 pb-4">
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <AlexaMessage
                                    key={`${message.id}-${index}`}
                                    content={message.content}
                                    timestamp={message.timestamp}
                                />
                            )
                        }
                        if (message.role === 'tool_use') {
                            return (
                                <ToolUseMessage
                                    key={`${message.id}-${index}`}
                                    id={message.id}
                                    tool={message.tool}
                                    input={message.input}
                                    status={"success"}
                                    timestamp={message.timestamp}
                                />
                            )
                        }
                        // At this point TypeScript knows it must be a user message
                        return (
                            <UserMessage
                                key={`${message.id}-${index}`}
                                content={message.content}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
} 