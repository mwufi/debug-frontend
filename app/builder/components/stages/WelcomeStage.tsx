'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface WelcomeStageProps {
    onNext: () => void;
    loading?: boolean;
}

export function WelcomeStage({ onNext, loading }: WelcomeStageProps) {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative aspect-video rounded-lg overflow-hidden"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://picsum.photos/1200/600?random=1)',
                        filter: 'brightness(0.7) contrast(1.2)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Craft Your Perfect AI Companion
                    </h2>
                    <p className="text-gray-200 max-w-lg">
                        Join an exclusive community of innovators who are redefining
                        the future of AI interaction. Your journey to a truly personalized
                        AI experience begins here.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-6"
            >
                {[
                    {
                        title: "Personalized Experience",
                        description: "Tailored to your unique preferences and needs"
                    },
                    {
                        title: "Advanced Capabilities",
                        description: "Powered by cutting-edge AI technology"
                    },
                    {
                        title: "Premium Support",
                        description: "24/7 dedicated assistance for our members"
                    }
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="p-6 rounded-lg bg-white/5 backdrop-blur-sm"
                    >
                        <h3 className="text-lg font-semibold text-white mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-400">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>


        </div>
    );
}