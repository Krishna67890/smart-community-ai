"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  CloudRain,
  Zap,
  Activity,
  Users,
  AlertTriangle,
  Calendar,
  Filter,
  ArrowRight,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { predictUrbanTrend } from '@/lib/vertex-ai';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Predictions = () => {
  const [selectedForecast, setSelectedForecast] = useState('traffic');
  const [isPredicting, setIsPredicting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [lastCommand, setLastCommand] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setVoiceSupported(true);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    // Initial page description voice
    const timer = setTimeout(() => {
      speak("Welcome to the Predictive Analytics suite. Here, we utilize Vertex AI models to forecast urban trends. You can filter by zones, adjust timeframes for the next seven days, or trigger a real-time analysis using the run forecast command.");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      speak("Listening for commands...");
    };

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setLastCommand(command);
      console.log("Voice Command:", command);

      if (command.includes('traffic')) {
        setSelectedForecast('traffic');
        speak("Switching to Traffic Flow forecast.");
      } else if (command.includes('air') || command.includes('pollution') || command.includes('quality')) {
        setSelectedForecast('pollution');
        speak("Switching to Air Quality forecast.");
      } else if (command.includes('energy') || command.includes('electricity')) {
        setSelectedForecast('energy');
        speak("Switching to Energy Demand forecast.");
      } else if (command.includes('disease') || command.includes('health')) {
        setSelectedForecast('disease');
        speak("Switching to Disease Spread forecast.");
      } else if (command.includes('waste')) {
        setSelectedForecast('waste');
        speak("Switching to Waste Generation forecast.");
      } else if (command.includes('run') || command.includes('predict') || command.includes('analyze')) {
        handlePredict();
      } else if (command.includes('seven days') || command.includes('week')) {
        speak("Filtering data for the next seven days across all sectors.");
      } else if (command.includes('all zones')) {
        speak("Aggregating multi-modal data from all urban zones.");
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    speak(`Analyzing multi-modal data streams for ${selectedForecast} forecasting.`);

    // Simulate complex calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    const result = await predictUrbanTrend({ type: selectedForecast });

    speak(`Forecast complete. We predict a stable trend with ninety-five percent accuracy for the next seven days.`);

    setIsPredicting(false);
  };

  const trafficData = {
    labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
    datasets: [
      {
        label: 'Predicted Traffic Volume',
        data: [30, 95, 60, 75, 98, 45, 20],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Historical Average',
        data: [25, 85, 55, 70, 90, 40, 15],
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      }
    ],
  };

  const aqiData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Predicted AQI',
        data: [45, 52, 110, 145, 95, 60, 50],
        backgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          return value > 100 ? '#EF4444' : '#22C55E';
        },
        borderRadius: 8,
      }
    ],
  };

  const forecasts = [
    { id: 'traffic', name: 'Traffic Flow', icon: TrendingUp, color: 'text-blue-500' },
    { id: 'pollution', name: 'Air Quality', icon: CloudRain, color: 'text-green-500' },
    { id: 'energy', name: 'Electricity Demand', icon: Zap, color: 'text-yellow-500' },
    { id: 'disease', name: 'Disease Spread', icon: Activity, color: 'text-red-500' },
    { id: 'waste', name: 'Waste Generation', icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <LineChartIcon className="text-primary" /> Predictive Analytics
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Advanced machine learning models forecasting city-wide trends up to 7 days in advance with 95% accuracy.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <AnimatePresence>
              {lastCommand && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="hidden md:block text-xs text-primary font-mono bg-primary/10 px-3 py-1 rounded-full border border-primary/20"
                >
                  Last Command: "{lastCommand}"
                </motion.div>
              )}
            </AnimatePresence>
            {voiceSupported && (
              <button
                onClick={startListening}
                className={`glass p-2 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-500 border-red-500/50 scale-110' : 'hover:bg-white/10'}`}
                title="Voice Commands"
              >
                {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={handlePredict}
              disabled={isPredicting}
              className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 ${isPredicting ? 'animate-pulse' : ''}`} />
              {isPredicting ? 'AI Working...' : 'Run Forecast'}
            </button>
            <button
              onClick={() => speak("Showing data for the next 7 days across all urban sectors.")}
              className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10"
            >
              <Calendar className="w-4 h-4" /> Next 7 Days
            </button>
            <button
              onClick={() => speak("Switching view to aggregate data from all city zones.")}
              className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10"
            >
              <Filter className="w-4 h-4" /> All Zones
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Forecast Types */}
          <div className="lg:col-span-1 space-y-3">
            {forecasts.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedForecast(f.id)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                  selectedForecast === f.id
                  ? 'glass border-primary/50 bg-primary/10 shadow-lg shadow-primary/5'
                  : 'glass border-white/5 hover:bg-white/5'
                }`}
              >
                <div className={`p-2 rounded-lg bg-white/5 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{f.name}</span>
              </button>
            ))}

            <div className="mt-8 p-6 glass rounded-2xl border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-2 text-yellow-500 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm font-bold uppercase">Early Warning</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Potential for flood risk in Downtown area due to heavy rainfall predicted for Friday evening.
              </p>
              <button className="mt-4 text-xs font-bold text-yellow-500 flex items-center gap-1 hover:underline">
                View Details <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="glass-card">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold">
                    {forecasts.find(f => f.id === selectedForecast)?.name} Forecast
                  </h3>
                  <p className="text-sm text-gray-500">Vertex AI Model: V4.2-CivicMind</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">95.2%</span>
                  <p className="text-[10px] text-gray-500 uppercase">Model Accuracy</p>
                </div>
              </div>

              <div className="h-[400px]">
                {selectedForecast === 'traffic' ? (
                  <Line
                    data={trafficData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } },
                      scales: {
                        y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                        x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                      }
                    }}
                  />
                ) : (
                  <Bar
                    data={aqiData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                        x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-2xl">
                <p className="text-xs text-gray-500 uppercase mb-2">Confidence Level</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[88%] h-full bg-blue-500" />
                  </div>
                  <span className="font-bold text-sm">88%</span>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl">
                <p className="text-xs text-gray-500 uppercase mb-2">Trend Analysis</p>
                <p className="text-lg font-bold text-green-500">Stabilizing</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <p className="text-xs text-gray-500 uppercase mb-2">Data Points Analyzed</p>
                <p className="text-lg font-bold text-white">1.2M+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;
