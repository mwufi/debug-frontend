'use client';

import React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { DynamicComponent } from '@/components/DynamicComponent';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Braces } from "lucide-react";

export default function Home() {
  const [componentCode, setComponentCode] = useState(`
const Counter = (props) => {
  const [count, setCount] = React.useState(0);
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold bg-primary text-primary-foreground p-4 rounded-lg">
        {props.label}: {count} 🧮
      </h3>
      <button
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </button><Card>
          <CardHeader>
            <CardTitle>Interactive Component</CardTitle>
          </CardHeader>
          </Card>
    </div>
  );
};

render(<Counter label="Counter" />);
`);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Braces className="h-8 w-8" />
          React Live Playground
        </h1>
        <p className="text-muted-foreground">
          Edit the code below to see live changes. The playground supports React components with hooks and JSX.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Component</CardTitle>
          </CardHeader>
          <CardContent>
            <DynamicComponent code={componentCode} scope={{ Card, CardHeader, CardTitle }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
