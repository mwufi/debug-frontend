export type Message = {
    role: 'user' | 'assistant'
    content: string
}

export async function streamChat(chatId: string, message: string, onChunk: (chunk: string) => void) {
    try {
        const response = await fetch(`http://localhost:8000/chat/${chatId}/push`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const reader = response.body?.getReader()
        if (!reader) {
            throw new Error('No reader available')
        }

        const decoder = new TextDecoder()

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6))
                        onChunk(data.content)
                    } catch (e) {
                        console.error('Error parsing SSE data:', e)
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
} 