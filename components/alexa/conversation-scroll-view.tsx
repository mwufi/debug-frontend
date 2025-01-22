"use client"

import { AlexaMessage } from "./alexa-message"
import { UserMessage } from "./user-message"
import { useAlexaChat } from "./alexa-chat-context"

export function ConversationScrollView() {
    const { messages } = useAlexaChat()

    return (
        <div className="flex flex-col h-full relative items-center">
            <div className="w-full h-full overflow-y-auto flex flex-col items-center px-5 pb-[157px]">
                <div key="conversation-scroll" className="relative w-full flex flex-col items-center pt-20 pb-4">
                    {messages.map((message, index) => (
                        message.role === 'assistant' ? (
                            <AlexaMessage
                                key={`${message.id}-${index}`}
                                content={message.content}
                                timestamp={message.timestamp}
                            />
                        ) : (
                            <UserMessage
                                key={`${message.id}-${index}`}
                                content={message.content}
                            />
                        )
                    ))}
                </div>
            </div>
        </div>
    )
} 