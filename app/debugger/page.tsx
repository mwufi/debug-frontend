import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import AgentStateViewer from "@/components/agent/AgentStateViewer";
import AgentControls from "@/components/agent/AgentControls";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Agent Debugger</h1>
        <p className="text-muted-foreground">
          Inspect and control experimental AI agents with ease
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agent State</CardTitle>
            <CardDescription>Current agent memory and knowledge state</CardDescription>
          </CardHeader>
          <CardContent>
            <AgentStateViewer />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Modify agent behavior and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <AgentControls />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
