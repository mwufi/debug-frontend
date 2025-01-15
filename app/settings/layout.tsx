'use client'

import { ChatProvider } from "@/lib/chat-context"

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ChatProvider>{children}</ChatProvider>
} 