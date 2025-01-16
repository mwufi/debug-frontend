import ChatInterface from "@/components/chat/ChatInterface";

export default function ChatPage() {
    return (
        <div className="container mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">AI Agent Chat</h1>
                <p className="text-muted-foreground">
                    Chat with AI agents and inspect their decision-making process
                </p>
            </header>

            <ChatInterface />
        </div>
    );
} 