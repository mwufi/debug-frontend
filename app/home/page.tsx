'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Brain, Code, MessageSquare, Zap } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6"
                >
                    Your AI Companion
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                >
                    Experience the next generation of AI assistance with our advanced, personalized agent.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        asChild
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full"
                    >
                        <Link href="/builder">
                            Create Your AI <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Powerful Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Brain className="h-8 w-8 text-blue-400" />,
                            title: "Advanced Intelligence",
                            description: "Powered by state-of-the-art language models"
                        },
                        {
                            icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
                            title: "Natural Conversations",
                            description: "Engage in fluid, context-aware dialogues"
                        },
                        {
                            icon: <Code className="h-8 w-8 text-green-400" />,
                            title: "Code Assistant",
                            description: "Get help with programming and debugging"
                        },
                        {
                            icon: <Zap className="h-8 w-8 text-yellow-400" />,
                            title: "Lightning Fast",
                            description: "Instant responses to your queries"
                        },
                        {
                            icon: <Bot className="h-8 w-8 text-pink-400" />,
                            title: "Customizable",
                            description: "Tailor the AI to your specific needs"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index }}
                        >
                            <Card className="p-6 bg-white/5 backdrop-blur-sm border-0 hover:bg-white/10 transition-colors">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center text-white mb-12">What Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "This AI assistant has revolutionized how I work. It's like having a brilliant colleague available 24/7.",
                            author: "Sarah J.",
                            role: "Software Engineer"
                        },
                        {
                            quote: "The customization options are incredible. I've trained it to understand my business perfectly.",
                            author: "Michael R.",
                            role: "Business Analyst"
                        },
                        {
                            quote: "The code assistance feature has saved me countless hours of debugging and research.",
                            author: "David L.",
                            role: "Full Stack Developer"
                        }
                    ].map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 * index }}
                        >
                            <Card className="p-6 bg-white/5 backdrop-blur-sm border-0">
                                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.author}</p>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}