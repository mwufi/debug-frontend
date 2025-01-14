'use client';

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AgentStateViewer() {
    return (
        <Tabs defaultValue="memory" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="memory">Memory</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                <TabsTrigger value="state">State</TabsTrigger>
            </TabsList>

            <TabsContent value="memory">
                <Card className="p-4">
                    <pre className="text-sm">
                        {JSON.stringify({
                            shortTermMemory: [],
                            workingMemory: {},
                        }, null, 2)}
                    </pre>
                </Card>
            </TabsContent>

            <TabsContent value="knowledge">
                <Card className="p-4">
                    <pre className="text-sm">
                        {JSON.stringify({
                            facts: [],
                            rules: [],
                        }, null, 2)}
                    </pre>
                </Card>
            </TabsContent>

            <TabsContent value="state">
                <Card className="p-4">
                    <pre className="text-sm">
                        {JSON.stringify({
                            status: "idle",
                            lastAction: null,
                            goals: [],
                        }, null, 2)}
                    </pre>
                </Card>
            </TabsContent>
        </Tabs>
    );
} 