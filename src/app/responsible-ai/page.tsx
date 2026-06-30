"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Scale,
  Eye,
  Lock,
  FileText,
  Search,
  MessageSquare,
  AlertCircle,
  Brain,
  Cpu,
  Database,
  Globe,
  CheckCircle2,
  Volume2,
  Play
} from 'lucide-react';
import { getGeminiResponse } from '@/lib/gemini';

const ResponsibleAIPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.onstart = () => setIsNarrating(true);
      utterance.onend = () => setIsNarrating(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleGeminiAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const prompt = `As a Responsible AI Expert for CivicMind AI, answer the following question about AI ethics, fairness, or safety in our platform: ${query}. Focus on Google Cloud's AI Principles and how we apply them.`;
      const result = await getGeminiResponse(prompt);
      setResponse(result);
      speak(result);
    } catch (error) {
      setResponse("I'm sorry, I couldn't process that request at the moment.");
    } finally {
      setLoading(false);
    }
  };

  const aiPrinciples = [
    {
      title: "Be socially beneficial",
      icon: Globe,
      description: "Our AI models are designed to improve community well-being, focusing on infrastructure, health, and safety.",
      color: "text-blue-500"
    },
    {
      title: "Avoid creating bias",
      icon: Scale,
      description: "We use diverse datasets and rigorous testing to ensure our predictions don't disadvantage any demographic group.",
      color: "text-purple-500"
    },
    {
      title: "Be built and tested for safety",
      icon: ShieldCheck,
      description: "Rigorous safety constraints are built into our Vertex AI pipelines to prevent unintended harmful consequences.",
      color: "text-green-500"
    },
    {
      title: "Be accountable to people",
      icon: Eye,
      description: "Human-in-the-loop systems ensure that AI recommendations are always reviewed by subject matter experts.",
      color: "text-orange-500"
    }
  ];

  const startVoiceTour = () => {
    const text = "Responsible AI is at the core of CivicMind AI. As part of the Neural Networks team's commitment to the Gen AI Academy APAC Edition, we follow Google Cloud's strict AI principles. We ensure our models are socially beneficial, avoid bias, and remain accountable to the communities they serve. Use the Gemini AI search below to learn more about how we implement safety and fairness in our decision intelligence platform.";
    speak(text);
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-primary/30">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Ethical Framework</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Responsible <span className="text-gradient">AI.</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            How we ensure fairness, safety, and accountability in every decision powered by CivicMind AI.
          </p>
          <button
            onClick={startVoiceTour}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold mx-auto transition-all ${isNarrating ? 'bg-primary text-white' : 'glass hover:bg-white/10'}`}
          >
            {isNarrating ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5" />}
            {isNarrating ? "AI Explaining..." : "AI Ethics Overview"}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold mb-6">Our AI Principles</h2>
            <div className="grid grid-cols-1 gap-6">
              {aiPrinciples.map((principle, index) => (
                <div key={index} className="glass-card p-6 flex gap-6">
                  <div className={`p-4 glass rounded-2xl h-fit ${principle.color}`}>
                    <principle.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{principle.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Ask Gemini about Ethics</h2>
            </div>
            <p className="text-gray-400 mb-8 text-sm">
              Curious about how we handle data privacy or mitigate bias? Ask our Gemini-powered Responsible AI assistant.
            </p>

            <div className="space-y-4 flex-1">
              <div className="relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., How does CivicMind AI ensure data privacy?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px] resize-none"
                />
                <button
                  onClick={handleGeminiAsk}
                  disabled={loading}
                  className="absolute bottom-4 right-4 p-3 bg-primary rounded-xl hover:bg-primary/80 transition-colors disabled:opacity-50"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
              </div>

              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 glass bg-primary/5 rounded-2xl border-primary/20"
                >
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Gemini Response</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    "{response}"
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center border-b-4 border-blue-500">
            <Lock className="w-10 h-10 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Data Privacy</h3>
            <p className="text-xs text-gray-500">End-to-end encryption for all community data assets.</p>
          </div>
          <div className="glass-card p-8 text-center border-b-4 border-purple-500">
            <FileText className="w-10 h-10 text-purple-500 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Transparency</h3>
            <p className="text-xs text-gray-500">Open documentation for all AI model architectures.</p>
          </div>
          <div className="glass-card p-8 text-center border-b-4 border-green-500">
            <AlertCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Compliance</h3>
            <p className="text-xs text-gray-500">Aligned with global AI safety and governance standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleAIPage;
