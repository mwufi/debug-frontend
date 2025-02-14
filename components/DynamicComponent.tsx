'use client';

import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

interface DynamicComponentProps {
    code?: string;
    scope: Record<string, unknown>;
}

export function DynamicComponent({ code = '', scope = {} }: DynamicComponentProps) {
    return (
        <LiveProvider code={code} scope={scope} noInline>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="font-mono bg-background rounded-lg border p-4">
                    <LiveEditor className="min-h-[200px]" />
                </div>
                <div className="bg-background rounded-lg border p-4">
                    <LivePreview />
                    <LiveError className="p-4 text-red-500 bg-red-50 rounded border border-red-200 font-mono text-sm" />
                </div>
            </div>
        </LiveProvider>
    );
}