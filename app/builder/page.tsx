'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Bot } from "lucide-react";

export default function AgentBuilder() {
    const [agentConfig, setAgentConfig] = useState({
        name: "",
        description: "",
        systemPrompt: "",
        hasMemory: true,
        capabilities: {
            codeReview: false,
            documentation: false,
            socialMedia: false
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement agent creation logic
        console.log("Creating agent:", agentConfig);
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Bot className="h-8 w-8" />
                    <h1 className="text-4xl font-bold">Create New Agent</h1>
                </div>
                <p className="text-muted-foreground">
                    Configure your AI agent's capabilities and behavior
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Set your agent's identity and purpose
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Agent Name</Label>
                            <Input
                                id="name"
                                value={agentConfig.name}
                                onChange={(e) => setAgentConfig(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="e.g., Code Review Assistant"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={agentConfig.description}
                                onChange={(e) => setAgentConfig(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Describe what your agent does..."
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Capabilities</CardTitle>
                        <CardDescription>
                            Select what your agent can do
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="codeReview">Code Review</Label>
                                <p className="text-sm text-muted-foreground">Review and analyze code</p>
                            </div>
                            <Switch
                                id="codeReview"
                                checked={agentConfig.capabilities.codeReview}
                                onCheckedChange={(checked) => setAgentConfig(prev => ({
                                    ...prev,
                                    capabilities: { ...prev.capabilities, codeReview: checked }
                                }))}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="documentation">Documentation</Label>
                                <p className="text-sm text-muted-foreground">Access and reference documentation</p>
                            </div>
                            <Switch
                                id="documentation"
                                checked={agentConfig.capabilities.documentation}
                                onCheckedChange={(checked) => setAgentConfig(prev => ({
                                    ...prev,
                                    capabilities: { ...prev.capabilities, documentation: checked }
                                }))}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="socialMedia">Social Media</Label>
                                <p className="text-sm text-muted-foreground">Generate content and interact on social platforms</p>
                            </div>
                            <Switch
                                id="socialMedia"
                                checked={agentConfig.capabilities.socialMedia}
                                onCheckedChange={(checked) => setAgentConfig(prev => ({
                                    ...prev,
                                    capabilities: { ...prev.capabilities, socialMedia: checked }
                                }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Behavior Configuration</CardTitle>
                        <CardDescription>
                            Define how your agent thinks and responds
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="systemPrompt">System Instructions</Label>
                            <Textarea
                                id="systemPrompt"
                                value={agentConfig.systemPrompt}
                                onChange={(e) => setAgentConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                                placeholder="Give specific instructions about how the agent should behave..."
                                className="min-h-[100px]"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="memory">Conversation Memory</Label>
                                <p className="text-sm text-muted-foreground">Remember context from previous interactions</p>
                            </div>
                            <Switch
                                id="memory"
                                checked={agentConfig.hasMemory}
                                onCheckedChange={(checked) => setAgentConfig(prev => ({ ...prev, hasMemory: checked }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button">Cancel</Button>
                    <Button type="submit">Create Agent</Button>
                </div>
            </form>
        </div>
    );
}