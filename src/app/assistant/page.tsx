"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Paperclip,
  Mic,
  Sparkles,
  Search,
  MessageSquare,
  History,
  Info,
  Volume2,
  VolumeX
} from 'lucide-react';

import { getGeminiResponse } from '@/lib/gemini';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setIsMounted(true);
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm CivicMind AI, your expert decision intelligence companion. I'm connected to the city's real-time data grid and Google Cloud's most advanced AI clusters. How can we optimize our community today?",
        timestamp: new Date(),
      }
    ]);
  }, []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [history, setHistory] = useState<string[]>([
    "Traffic Prediction North",
    "AQI Analysis Nashik",
    "Hospital Bed Capacity",
    "Waste Management Plan"
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleNewAnalysis = () => {
    if (messages.length > 1) {
      const firstUserMsg = messages.find(m => m.role === 'user');
      if (firstUserMsg && !history.includes(firstUserMsg.content.substring(0, 30))) {
        setHistory(prev => [firstUserMsg.content.substring(0, 30) + "...", ...prev.slice(0, 5)]);
      }
    }
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: "Starting a fresh analysis. Data buffers cleared. What's our next objective?",
      timestamp: new Date(),
    }]);
    speak("System reset. New analysis session initialized.");
  };

  const loadHistoryItem = (item: string) => {
    const fakeContent = `Restoring previous analysis context for: "${item}". All neural weights have been reloaded from BigQuery.`;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: fakeContent,
      timestamp: new Date()
    }]);
    speak(fakeContent);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-send if transcript is long enough
        if (transcript.length > 3) {
           handleSendWithTranscript(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        speak("Listening for your command.");
      } catch (e) {
        console.error("Failed to start recognition:", e);
      }
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechUtteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        speak(lastMessage.content);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    await handleSendWithTranscript(input);
  };

  const handleSendWithTranscript = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Update history with the new query
    setHistory(prev => {
      const newQuery = text.length > 25 ? text.substring(0, 25) + "..." : text;
      if (!prev.includes(newQuery)) {
        return [newQuery, ...prev.slice(0, 5)];
      }
      return prev;
    });

    try {
      // Simulate "Thinking" delay for more human-like feel
      await new Promise(resolve => setTimeout(resolve, 1500));

      const quickResponse = getPlaceholderResponse(text);
      let finalResponse = quickResponse;

      if (quickResponse.includes("knowledge graph")) {
        finalResponse = await getGeminiResponse(text);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: finalResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      speak(finalResponse);
    } catch (error) {
      console.error("AI Assistant Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaceholderResponse = (query: string) => {
    const q = query.toLowerCase();

    // Website specific human-like messages
    if (q.includes('who are you') || q.includes('what is this') || q.includes('about the website')) {
      return "I am CivicMind AI, a state-of-the-art Decision Intelligence Platform built for the Gen AI Academy Hackathon. My architecture integrates Gemini's multimodal capabilities with BigQuery's analytical power. I'm not just a chatbot; I'm a neural bridge between raw urban data and community well-being, designed to help city leaders and citizens co-create a smarter future.";
    }

    if (q.includes('hospital')) {
      return "Analyzing healthcare nodes... City General Hospital currently reports 15 available beds. However, my recommendation is to consider the Westside Clinic if the case is non-critical, as their wait time is currently 40% lower. I've cross-referenced this with current traffic patterns for the fastest route. [Source: Healthcare API v2]";
    }

    if (q.includes('traffic')) {
      return "Neural traffic forecast: I'm seeing a significant density spike on North Avenue predicted for 5:15 PM. Recommendation: Urban planners should adjust signal timings on Parallel Street now to preemptive congestion. For citizens, rerouting via the Outer Ring Road will save approximately 22 minutes. [Source: Traffic Forecasting Model]";
    }

    if (q.includes('pollution') || q.includes('aqi')) {
      return "Atmospheric scan complete. AQI near Nashik is 142. My analysis identifies localized industrial emissions as the primary driver. Recommendation: The city should implement a temporary 'Green Zone' restriction for heavy vehicles in Sector 7. Sensitive groups should stay indoors until 8:00 PM when wind dispersal improves. [Source: Enviro-Sensor Network]";
    }

    if (q.includes('recommend') || q.includes('suggest')) {
      return "Based on current urban growth metrics, I highly recommend expanding EV charging infrastructure in the Eastern District. My data shows a 30% increase in electric vehicle registrations but a 0% growth in charging ports. Optimizing this now will prevent a future energy bottleneck. [Source: Infrastructure Growth Analysis]";
    }

    if (q.includes('summarize')) {
      return "I've synthesized the 'City_Planning_2024' document. The core strategy revolves around '15-minute cities'. My recommendation for implementation is to prioritize pedestrian-first infrastructure in Zone B, which currently has the highest density of school-age children but the lowest sidewalk-to-road ratio. [Source: RAG Index]";
    }

    if (q.includes('emergency') || q.includes('flood')) {
      return "CRITICAL ALERT: Sensor #452 (River Bank) is reporting anomalous rise rates. My predictive model 'FloodPredict' indicates a 72% probability of overflow within 3.5 hours. Immediate Action: Activate drainage pump station #4 and dispatch warning notifications to residents in Low-lying Sector A. [Source: Real-time Hydrology Sensor]";
    }

    return "I've cross-referenced your query across our community knowledge graph and real-time sensor streams. My current recommendation is to look into 'Urban Optimization' trends for your specific sector. Would you like a detailed breakdown of environmental metrics or a predictive traffic analysis for this afternoon?";
  };

  const suggestions = [
    "Which hospital has beds?",
    "Predict tomorrow's traffic.",
    "Show pollution near Nashik.",
    "Summarize government reports."
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] bg-dark/30">
      {/* Sidebar - Chat History */}
      <div className="hidden lg:flex w-80 flex-col glass border-r border-white/10 p-4">
        <button
          onClick={handleNewAnalysis}
          className="btn-primary flex items-center justify-center gap-2 mb-8 transition-transform active:scale-95"
        >
          <MessageSquare className="w-4 h-4" /> New Analysis
        </button>

        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-2">Recent Queries</div>
          {history.map((item, i) => (
            <button
              key={i}
              onClick={() => loadHistoryItem(item)}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-all flex items-center gap-3 group"
            >
              <History className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              <span className="truncate group-hover:text-white transition-colors">{item}</span>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">Gemini Pro Enabled</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Using advanced RAG models for accurate community intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between glass">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold">CivicMind AI Assistant</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-400">Vertex AI • BigQuery • RAG</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpeaking}
              className={`p-2 rounded-full transition-colors ${isSpeaking ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-gray-400'}`}
              title={isSpeaking ? "Stop speaking" : "Listen to last response"}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full">
              <Info className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    m.role === 'user' ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    m.role === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'glass rounded-tl-none'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed">{m.content}</p>
                    <span suppressHydrationWarning className="text-[10px] opacity-50 mt-2 block">
                      {isMounted ? m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="glass p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions Bar */}
        <div className="px-4 md:px-8 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="whitespace-nowrap px-4 py-2 glass rounded-full text-xs hover:bg-white/10 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-8 pt-0">
          <div className="relative glass rounded-2xl border border-white/20 p-2">
            <div className="flex items-center gap-2">
              <button className="p-3 text-gray-400 hover:text-white transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about traffic, pollution, hospital beds..."
                className="flex-1 bg-transparent border-none outline-none text-sm md:text-base py-3"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={startListening}
                  className={`p-3 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'}`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-primary rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 text-center mt-3">
            AI-generated responses based on real-time community data. Verify critical information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
