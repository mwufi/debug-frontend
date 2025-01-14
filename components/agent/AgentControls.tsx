'use client';

import { Button } from "@/components/ui/button";

export default function AgentControls() {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Start Agent</Button>
                <Button variant="outline">Stop Agent</Button>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium">Add Knowledge</h3>
                <textarea
                    className="w-full min-h-[100px] p-2 rounded-md border"
                    placeholder="Enter new knowledge or rules..."
                />
                <Button className="w-full">Add Knowledge</Button>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium">Execute Command</h3>
                <input
                    type="text"
                    className="w-full p-2 rounded-md border"
                    placeholder="Enter command..."
                />
                <Button className="w-full">Execute</Button>
            </div>
        </div>
    );
} 