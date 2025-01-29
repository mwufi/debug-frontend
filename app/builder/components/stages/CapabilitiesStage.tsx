'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CapabilitiesStageProps {
    onNext: () => void;
    loading?: boolean;
}

interface Capability {
    id: string;
    name: string;
    description: string;
    icon: string;
    premium: boolean;
}

export function CapabilitiesStage({ onNext, loading }: CapabilitiesStageProps) {
    const capabilities: Capability[] = [
        {
            id: 'code_review',
            name: 'Code Analysis',
            description: 'Advanced code review and optimization suggestions',
            icon: '💻',
            premium: true
        },
        {
            id: 'documentation',
            name: 'Documentation Assistant',
            description: 'Generate and maintain comprehensive documentation',
            icon: '📚',
            premium: false
        },
        {
            id: 'social_media',
            name: 'Social Media Manager',
            description: 'Create and schedule engaging social media content',
            icon: '🌐',
            premium: true
        },
        {
            id: 'research',
            name: 'Research Assistant',
            description: 'Analyze and summarize complex information',
            icon: '🔍',
            premium: true
        },
        {
            id: 'writing',
            name: 'Content Creator',
            description: 'Generate high-quality written content',
            icon: '✍️',
            premium: true
        }
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
            >
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Select the capabilities that matter most to you.
                    Each feature is carefully crafted to enhance your AI experience.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {capabilities.map((capability, index) => (
                    <motion.div
                        key={capability.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="p-6 rounded-lg bg-white/5 backdrop-blur-sm relative overflow-hidden group"
                    >
                        {capability.premium && (
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium">
                                    Premium
                                </span>
                            </div>
                        )}
                        <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{capability.icon}</span>
                                    <Label className="text-lg font-semibold text-white">
                                        {capability.name}
                                    </Label>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                    {capability.description}
                                </p>
                            </div>
                            <Switch
                                id={capability.id}
                                className="ml-4"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-start items-center"
            >
                <p className="text-sm text-gray-400">
                    Selected capabilities will be instantly available in your AI assistant
                </p>
            </motion.div>
        </div>
    );
}