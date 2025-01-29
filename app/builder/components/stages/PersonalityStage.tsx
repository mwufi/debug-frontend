'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PersonalityStageProps {
    onNext: () => void;
    loading?: boolean;
}

interface PersonalityTrait {
    name: string;
    description: string;
    leftLabel: string;
    rightLabel: string;
    value: number;
}

export function PersonalityStage({ onNext, loading }: PersonalityStageProps) {
    const traits: PersonalityTrait[] = [
        {
            name: "Communication Style",
            description: "How should your AI assistant communicate?",
            leftLabel: "Professional",
            rightLabel: "Casual",
            value: 50
        },
        {
            name: "Response Length",
            description: "How detailed should the responses be?",
            leftLabel: "Concise",
            rightLabel: "Detailed",
            value: 50
        },
        {
            name: "Initiative Level",
            description: "How proactive should your AI be?",
            leftLabel: "Reactive",
            rightLabel: "Proactive",
            value: 50
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
                    Fine-tune your AI's personality to match your preferences.
                    These settings will influence how your AI communicates and interacts with you.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
            >
                {traits.map((trait, index) => (
                    <motion.div
                        key={trait.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="p-6 rounded-lg bg-white/5 backdrop-blur-sm space-y-4"
                    >
                        <div className="space-y-1">
                            <Label className="text-lg font-semibold text-white">
                                {trait.name}
                            </Label>
                            <p className="text-sm text-gray-400">
                                {trait.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Slider
                                defaultValue={[trait.value]}
                                max={100}
                                step={1}
                                className="py-4"
                            />
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>{trait.leftLabel}</span>
                                <span>{trait.rightLabel}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>


        </div>
    );
}