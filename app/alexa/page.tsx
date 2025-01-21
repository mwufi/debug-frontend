import { Header } from "@/components/header"
import { BackgroundGradient, BackgroundGradientMask } from "@/components/ui/background-gradient"

export default function Home() {
    return (
        <div className="flex w-full h-full">
            <BackgroundGradient />
            <main className="h-dvh w-full relative selection:bg-highlight">
                <Header />
                <div className="flex flex-col gap-9 h-full w-full items-center py-16 justify-center lg:w-4/5 mx-auto p-4">
                    <div className="flex flex-col items-start gap-1 w-full px-4 lg:w-4/5 max-w-[50rem]">
                        <h1 className="text-primary text-3xl tracking-tight">
                            <span>Good Morning</span>, Zen.
                        </h1>
                        <h1 className="text-secondary text-3xl tracking-tight">
                            How can I help you today?
                        </h1>
                    </div>
                    <div className="w-full flex flex-col gap-2 items-center">
                        <form className="w-full text-base flex flex-col gap-2 items-center justify-center relative z-10 mt-2">
                            <div className="flex flex-row gap-2 justify-center w-full lg:w-4/5 relative">
                                <div className="max-w-[50rem] relative w-full rounded-2xl sm:rounded-3xl duration-100 p-3 bg-input backdrop-blur-lg ring-2 ring-input-border ring-inset focus-within:ring-input-border-focus focus-within:bg-input-hover focus-within:shadow-[0px_2px_24px_2px_var(--input-glow)] hover:ring-input-border-focus hover:bg-input-hover">
                                    <div className="relative">
                                        <span className="tracking-[-0.02em] absolute py-2 px-3 text-secondary pointer-events-none">
                                            Generate an image for me
                                        </span>
                                        <textarea
                                            className="w-full py-2 px-3 bg-transparent focus:outline-none text-primary align-bottom"
                                            style={{ resize: "none", height: "66px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
