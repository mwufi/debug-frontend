import { Header } from "@/components/header"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { AlexaForm } from "@/components/alexa/alexa-form"

export default function Home() {
    return (
        <div className="flex w-full h-full">
            <BackgroundGradient />
            <main className="h-dvh w-full relative selection:bg-highlight">
                <Header />
                <div className="flex flex-col gap-9 h-full w-full items-center py-16 justify-center lg:w-4/5 mx-auto p-4">
                    <div className="flex flex-col items-start gap-1 w-full px-4 lg:w-4/5 max-w-[50rem]">
                        <h1 className="font-semibold text-3xl tracking-tight">
                            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Good Morning</span>, Zen.
                        </h1>
                        <h1 className="text-muted-foreground text-3xl tracking-tight">
                            How can I help you today?
                        </h1>
                    </div>
                    <div className="w-full flex flex-col gap-2 items-center">
                        <AlexaForm homepage={true} />
                    </div>
                </div>
            </main>
        </div>
    )
}
