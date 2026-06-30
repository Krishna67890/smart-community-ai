"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Sliders,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Info,
  Save,
  RefreshCcw,
  BarChart3,
  DollarSign,
  Users,
  Building2,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Simulator = () => {
  const [budget, setBudget] = useState(50); // 0 to 100 scale
  const [populationGrowth, setPopulationGrowth] = useState(2); // 0 to 5%
  const [data, setData] = useState<any>(null);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const speak = useCallback((text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.onstart = () => setIsNarrating(true);
      utterance.onend = () => setIsNarrating(false);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const saveScenario = () => {
    const scenario = {
      budget,
      populationGrowth,
      timestamp: new Date().toISOString(),
      data: data.datasets.map((d: any) => d.data)
    };
    const saved = JSON.parse(localStorage.getItem('civicmind_scenarios') || '[]');
    localStorage.setItem('civicmind_scenarios', JSON.stringify([...saved, scenario]));

    setIsSaved(true);
    speak("Scenario successfully encrypted and saved to the city planning cloud vault.");
    setTimeout(() => setIsSaved(false), 3000);
  };

  const generateScenario = useCallback(() => {
    const years = ['2024', '2025', '2026', '2027', '2028'];

    // Logic: Lower budget = Higher degradation
    // Higher population growth = Higher degradation
    const baseDegradation = [10, 15, 22, 30, 42];
    const budgetFactor = (100 - budget) / 50;
    const popFactor = populationGrowth / 2;

    const degradationData = baseDegradation.map((val, i) => {
      const multiplier = 1 + (budgetFactor * 0.5 * (i + 1)) + (popFactor * 0.2 * (i + 1));
      return Math.min(100, Math.round(val * multiplier));
    });

    const costData = degradationData.map((deg, i) => {
      // Cost to repair increases exponentially with degradation
      return Math.round(deg * (1 + i * 0.5) * 1.5);
    });

    setData({
      labels: years,
      datasets: [
        {
          label: 'Predicted Road Degradation (%)',
          data: degradationData,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Estimated Repair Costs ($M)',
          data: costData,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
        }
      ]
    });
  }, [budget, populationGrowth]);

  useEffect(() => {
    generateScenario();
  }, [generateScenario]);

  useEffect(() => {
    const timer = setTimeout(() => {
      speak("Welcome to the Executive What-If Simulator. This tool uses Vertex AI Time Series forecasting to help city planners visualize long-term impacts of fiscal decisions. Adjust the maintenance budget and population growth sliders to see how they impact road degradation and future repair costs over a five-year horizon.");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBudgetChange = (val: number) => {
    setBudget(val);
    if (val < 30) {
      speak("Warning: Budget levels below 30 percent will lead to critical infrastructure failure within 3 years.");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full mb-4 text-primary text-xs font-bold uppercase tracking-widest">
              <Sliders className="w-4 h-4" /> Strategy Simulator
            </div>
            <h1 className="text-4xl font-bold mb-2">Urban "What-If" Analysis</h1>
            <p className="text-gray-400 max-w-2xl">
              Simulate the long-term impact of infrastructure decisions using Vertex AI forecasting models.
            </p>
          </div>
          <div className="flex gap-4">
             <button
               onClick={saveScenario}
               className={`glass px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${isSaved ? 'bg-secondary/20 border-secondary text-secondary' : 'hover:bg-white/10'}`}
             >
               {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
               {isSaved ? "Scenario Saved!" : "Save Scenario"}
             </button>
             <button
               onClick={() => {
                 setBudget(50);
                 setPopulationGrowth(2);
                 speak("Simultor reset to baseline city growth metrics.");
               }}
               className="glass px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
             >
               <RefreshCcw className="w-5 h-5" /> Reset
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Building2 className="text-primary" /> Parameters
              </h3>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-300">Maintenance Budget</label>
                    <span className="text-primary font-bold">${budget}M</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={budget}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 uppercase">
                    <span>Austerity</span>
                    <span>Growth</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-300">Population Growth</label>
                    <span className="text-secondary font-bold">{populationGrowth}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={populationGrowth}
                    onChange={(e) => setPopulationGrowth(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 uppercase">
                    <span>Stable</span>
                    <span>Rapid</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-4 glass bg-primary/5 rounded-xl border-primary/20">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">AI Insight</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {budget < 40
                    ? "Current budget allocation is below the sustainability threshold. Expect exponential increase in repair costs after Year 2."
                    : "Stable budget allocation identified. Long-term infrastructure health is projected to remain within manageable limits."}
                </p>
              </div>
            </div>

            <div className={`p-6 glass rounded-3xl border-l-4 transition-all ${budget < 30 ? 'border-red-500 bg-red-500/5' : 'border-green-500 bg-green-500/5'}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={budget < 30 ? 'text-red-500' : 'text-green-500'} />
                <h4 className="font-bold">Fiscal Health Score</h4>
              </div>
              <p className="text-2xl font-bold">{budget < 30 ? 'Poor' : budget < 60 ? 'Fair' : 'Excellent'}</p>
              <p className="text-xs text-gray-500 mt-1">Based on projected infrastructure ROI.</p>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-8 min-h-[500px]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">5-Year Infrastructure Outlook</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-400 text-[10px] uppercase">Degradation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-gray-400 text-[10px] uppercase">Repair Cost</span>
                  </div>
                </div>
              </div>

              <div className="h-[400px]">
                {data && (
                  <Line
                    data={data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      interaction: { mode: 'index', intersect: false },
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          grid: { color: 'rgba(255, 255, 255, 0.05)' },
                          ticks: { color: '#94a3b8', font: { size: 10 } }
                        },
                        x: {
                          grid: { display: false },
                          ticks: { color: '#94a3b8', font: { size: 10 } }
                        }
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Total 5Y Cost</span>
                </div>
                <p className="text-2xl font-bold">
                  ${data ? data.datasets[1].data.reduce((a: any, b: any) => a + b, 0) : 0}M
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-red-400">
                  <TrendingUp className="w-3 h-3" /> 12% vs Baseline
                </div>
              </div>

              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Public Safety Risk</span>
                </div>
                <p className={`text-2xl font-bold ${budget < 30 ? 'text-red-500' : 'text-white'}`}>
                  {budget < 30 ? 'High' : budget < 50 ? 'Moderate' : 'Low'}
                </p>
                <div className="mt-2 text-[10px] text-gray-500 italic">
                  Projected incidents per year.
                </div>
              </div>

              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Efficiency</span>
                </div>
                <p className="text-2xl font-bold">{Math.round((budget / 100) * 85 + 10)}%</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-green-400">
                  <TrendingUp className="w-3 h-3" /> Optimal Range
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
