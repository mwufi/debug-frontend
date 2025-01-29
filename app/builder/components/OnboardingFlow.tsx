'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeStage } from './stages/WelcomeStage';
import { PersonalityStage } from './stages/PersonalityStage';
import { CapabilitiesStage } from './stages/CapabilitiesStage';

type Stage = 'welcome' | 'personality' | 'capabilities' | 'customization' | 'final';

export function OnboardingFlow() {
    const [stage, setStage] = useState<Stage>('welcome');
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        const stageOrder: Stage[] = ['welcome', 'personality', 'capabilities', 'customization', 'final'];
        const currentIndex = stageOrder.indexOf(stage);
        if (currentIndex > 0) {
            setStage(stageOrder[currentIndex - 1]);
        }
    };

    const stages: Record<Stage, {
        title: string;
        subtitle: string;
        progress: number;
    }> = {
        welcome: {
            title: "Welcome to Your Personal AI Journey",
            subtitle: "Let's create something extraordinary together",
            progress: 0
        },
        personality: {
            title: "Design Your AI's Personality",
            subtitle: "Shape the character that will represent you",
            progress: 25
        },
        capabilities: {
            title: "Select Your AI's Capabilities",
            subtitle: "Customize the tools at your disposal",
            progress: 50
        },
        customization: {
            title: "Fine-tune Your Experience",
            subtitle: "Perfect every detail",
            progress: 75
        },
        final: {
            title: "Your AI Assistant is Ready",
            subtitle: "The beginning of something amazing",
            progress: 100
        }
    };

    const handleNext = async () => {
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated loading
        setLoading(false);

        const stageOrder: Stage[] = ['welcome', 'personality', 'capabilities', 'customization', 'final'];
        const currentIndex = stageOrder.indexOf(stage);
        if (currentIndex < stageOrder.length - 1) {
            setStage(stageOrder[currentIndex + 1]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
            <Card className="w-full max-w-4xl bg-black/20 backdrop-blur-xl border-0 shadow-2xl">
                <div className="relative overflow-hidden">
                    {/* Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${stages[stage].progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    <div className="p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={stage}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-2">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        {stages[stage].title}
                                    </h1>
                                    <p className="text-gray-400">
                                        {stages[stage].subtitle}
                                    </p>
                                </div>

                                {stage === 'welcome' && (
                                    <WelcomeStage onNext={handleNext} loading={loading} />
                                )}
                                {stage === 'personality' && (
                                    <PersonalityStage onNext={handleNext} loading={loading} />
                                )}
                                {stage === 'capabilities' && (
                                    <CapabilitiesStage onNext={handleNext} loading={loading} />
                                )}
                                {stage === 'final' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Card className="p-6 bg-white/5">
                                                <h3 className="text-xl font-semibold text-white mb-4">AI Capabilities</h3>
                                                <ul className="space-y-3 text-gray-300">
                                                    <li>✨ Natural language processing</li>
                                                    <li>🤖 Task automation</li>
                                                    <li>💡 Creative assistance</li>
                                                    <li>📚 Knowledge base integration</li>
                                                </ul>
                                            </Card>
                                            <Card className="p-6 bg-white/5">
                                                <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
                                                <ul className="space-y-3 text-gray-300">
                                                    <li>1. Explore the dashboard</li>
                                                    <li>2. Start a conversation</li>
                                                    <li>3. Try out commands</li>
                                                    <li>4. Customize settings</li>
                                                </ul>
                                            </Card>
                                        </div>
                                        <div className="aspect-video rounded-lg overflow-hidden">
                                            <img
                                                src="https://picsum.photos/1200/600?random=2"
                                                alt="AI Assistant Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    {stage !== 'welcome' && (
                                        <Button
                                            onClick={handleBack}
                                            variant="outline"
                                            disabled={loading}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        onClick={handleNext}
                                        disabled={loading}
                                        className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 ${stage === 'final' ? 'mx-auto' : ''}`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Processing
                                            </div>
                                        ) : stage === 'final' ? 'Get Started' : 'Continue'}
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Card>
        </div>
    );
}