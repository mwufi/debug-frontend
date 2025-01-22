"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageSquare, Search, Sparkles } from "lucide-react"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

export function Header({ className, ...props }: HeaderProps) {
    return (
        <div className={cn("w-full relative", className)} {...props}>
            <div className="h-24 sm:h-20 inset-x-0 top-0 absolute z-10 overflow-hidden pointer-events-none">
                <div className="w-screen h-dvh bg-gradient-to-b from-background via-background/80 to-transparent" />
            </div>
            <div className="w-full p-3 absolute top-0 h-16 flex flex-row justify-center items-center z-10">
                <div className="absolute start-1 flex flex-row items-start">
                    <Link
                        href="/alexa"
                        className="ms-2 me-[0.5] rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <div className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity">
                            Beam
                            <span className="text-[10px] text-primary/70 align-super ml-1">
                                beta
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="grow justify-center max-w-[40%] flex"></div>
                <div className="ml-auto flex flex-row gap-1 items-center absolute end-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl"
                        asChild
                    >
                        <Link href="/chat">
                            <MessageSquare className="text-muted-foreground h-[22px] w-[22px]" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl"
                        asChild
                    >
                        <Link href="/search">
                            <Search className="text-muted-foreground h-[22px] w-[22px]" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl"
                        asChild
                    >
                        <Link href="/ai">
                            <Sparkles className="text-muted-foreground h-[22px] w-[22px]" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
} 