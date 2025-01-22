"use client"

import { FormEvent, KeyboardEvent } from "react"

export function AlexaForm() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const textarea = form.querySelector('textarea')
        if (textarea) {
            console.log('Form submitted:', textarea.value)
            textarea.value = '' // Clear the input after submission
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            const form = e.currentTarget.form
            if (form) {
                form.requestSubmit()
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full text-base flex flex-col gap-2 items-center justify-center relative z-10 mt-2">
            <div className="flex flex-row gap-2 justify-center w-full lg:w-4/5 relative">
                <div className="max-w-[50rem] relative w-full rounded-2xl sm:rounded-3xl duration-100 p-3 bg-input backdrop-blur-lg ring-2 ring-input-border ring-inset focus-within:ring-input-border-focus focus-within:bg-input-hover focus-within:shadow-[0px_2px_24px_2px_var(--input-glow)] hover:ring-input-border-focus hover:bg-input-hover">
                    <div className="relative">
                        <textarea
                            className="w-full py-2 px-3 bg-transparent focus:outline-none text-foreground align-bottom"
                            style={{ resize: "none", height: "66px" }}
                            placeholder="Generate an image for me"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
} 