import { AlexaChatProvider } from "@/components/alexa/alexa-chat-context"

export default function AlexaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AlexaChatProvider>
            {children}
        </AlexaChatProvider>
    )
} 