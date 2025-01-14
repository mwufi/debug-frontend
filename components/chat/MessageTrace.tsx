'use client';

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TraceProps {
    trace: {
        context: any;
        memory: any;
        knowledge: any;
        reasoning: string[];
    };
}

export default function MessageTrace({ trace }: TraceProps) {
    return (
        <Card className="p-4 ml-14 bg-muted/50">
            <Tabs defaultValue="reasoning" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
                    <TabsTrigger value="context">Context</TabsTrigger>
                    <TabsTrigger value="memory">Memory</TabsTrigger>
                    <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                </TabsList>

                <TabsContent value="reasoning">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Reasoning Steps</h3>
                        <ol className="list-decimal pl-4 text-sm space-y-1">
                            {trace.reasoning.map((step, index) => (
                                <li key={index} className="text-muted-foreground">{step}</li>
                            ))}
                        </ol>
                    </div>
                </TabsContent>

                <TabsContent value="context">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Input Context</h3>
                        <pre className="text-sm bg-muted p-2 rounded">
                            {JSON.stringify(trace.context, null, 2)}
                        </pre>
                    </div>
                </TabsContent>

                <TabsContent value="memory">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Memory State</h3>
                        <div className="text-sm space-y-2">
                            <div>
                                <div className="font-medium">Working Memory:</div>
                                <pre className="bg-muted p-2 rounded">
                                    {JSON.stringify(trace.memory.working, null, 2)}
                                </pre>
                            </div>
                            <div>
                                <div className="font-medium">Retrieved Memories:</div>
                                <pre className="bg-muted p-2 rounded">
                                    {JSON.stringify(trace.memory.retrieved, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="knowledge">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Knowledge Used</h3>
                        <div className="text-sm space-y-2">
                            <div>
                                <div className="font-medium">Applied Rules:</div>
                                <ul className="list-disc pl-4 text-muted-foreground">
                                    {trace.knowledge.rules.map((rule, index) => (
                                        <li key={index}>{rule}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="font-medium">Retrieved Facts:</div>
                                <pre className="bg-muted p-2 rounded">
                                    {JSON.stringify(trace.knowledge.facts, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    );
} 