"use client"

import { Button } from "@/components/ui/button"
import {
    RefreshCcw,
    Copy,
    Share,
    ThumbsUp,
    ThumbsDown,
    LetterText,
    SquarePen
} from "lucide-react"

interface ActionButtonsProps {
    position: "start" | "end"
    actions: Array<"regenerate" | "copy" | "share" | "thumbsUp" | "thumbsDown" | "edit">
    timeElapsed?: string
}

const actionIcons = {
    regenerate: RefreshCcw,
    copy: Copy,
    share: Share,
    thumbsUp: ThumbsUp,
    thumbsDown: ThumbsDown,
    edit: SquarePen
}

export function ActionButtons({ position, actions, timeElapsed }: ActionButtonsProps) {
    return (
        <div className={`flex absolute -bottom-4 items-center gap-1 py-1 w-max opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity rounded-full text-xs ${position === 'start' ? 'start-0 md:start-3' : 'end-4'} action-buttons`}>
            {actions.map((action) => {
                const Icon = actionIcons[action]
                return (
                    <Button
                        key={action}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                    >
                        <Icon className="size-4" />
                    </Button>
                )
            })}
            {timeElapsed && (
                <div className="text-secondary">{timeElapsed}</div>
            )}
        </div>
    )
}