import { Header } from "@/components/header"
import { ConversationScrollView } from "@/components/alexa/conversation-scroll-view"
import { AlexaForm } from "@/components/alexa/alexa-form"

export default function ChatPage() {
    return (
        <div className="flex w-full h-full">
            <main className="h-dvh w-full relative">
                <Header />
                <ConversationScrollView />
                <div className="absolute w-full bottom-0">
                    <div className="w-full flex flex-col items-center p-2 sm:px-4 sm:pb-4 md:pb-6 pt-1">
                        <AlexaForm />
                    </div>
                </div>
            </main>
        </div>
    )
} 