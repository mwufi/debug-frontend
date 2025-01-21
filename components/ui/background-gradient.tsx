"use client"

import { cn } from "@/lib/utils"

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    children?: React.ReactNode
}

export function BackgroundGradient({
    className,
    children,
    ...props
}: BackgroundGradientProps) {
    return (
        <div className={cn("fixed w-screen h-dvh -z-10", className)} {...props}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
            {children}
        </div>
    )
}

export function BackgroundGradientMask({
    className,
    ...props
}: BackgroundGradientProps) {
    return (
        <div
            className={cn(
                "w-screen h-dvh bg-gradient-to-b from-background via-background/80 to-transparent",
                className
            )}
            {...props}
        />
    )
} 