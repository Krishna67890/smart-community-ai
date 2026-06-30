"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Users,
  Map as MapIcon,
  CloudRain,
  Zap,
  Trash2,
  AlertTriangle,
  Droplets,
  Building2,
  Car,
  Search,
  Maximize2,
  TrendingUp,
  Brain,
  Volume2,
  Cpu
} from 'lucide-react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [userName, setUserName] = React.useState('Officer');

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  React.useEffect(() => {
    const user = localStorage.getItem('civicmind_current_user');
    if (user) {
      setUserName(JSON.parse(user).firstName);
    }

    // Announce dashboard status
    const timer = setTimeout(() => {
      speak("System online. Decision Intelligence Dashboard loaded. Real-time traffic and pollution metrics are now active.");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const lineData = {
    // ... existing data
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Citizen Complaints',
        data: [65, 59, 80, 81, 56, 55],
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderColor: '#2563EB',
        tension: 0.4,
      },
      {
        label: 'Resolved Issues',
        data: [28, 48, 40, 19, 86, 27],
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: '#22C55E',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
    datasets: [
      {
        label: 'Pollution Index',
        data: [120, 150, 80, 200, 110],
        backgroundColor: '#2563EB',
      },
    ],
  };

  const pieData = {
    labels: ['Available', 'Occupied', 'Emergency Only'],
    datasets: [
      {
        data: [300, 450, 100],
        backgroundColor: ['#22C55E', '#2563EB', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const kpis = [
    { label: 'Traffic Flow', value: 'Moderate', icon: Car, color: 'text-blue-500' },
    { label: 'Air Quality', value: 'Good (42)', icon: CloudRain, color: 'text-green-500' },
    { label: 'Hospital Beds', value: '850 Available', icon: Building2, color: 'text-purple-500' },
    { label: 'Energy Usage', value: '4.2 GW', icon: Zap, color: 'text-yellow-500' },
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-dark/50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Decision Intelligence Dashboard</h1>
            <p className="text-gray-400">Real-time overview of community metrics and AI insights.</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/simulator"
              className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 border-primary/20 bg-primary/5 transition-all group"
            >
              <TrendingUp className="w-4 h-4 text-primary group-hover:scale-125 transition-transform" />
              Strategic Simulator
            </Link>
            <button
              onClick={() => speak("Refreshing all real-time data streams from Google Cloud BigQuery and Vertex AI. Confidence score for current metrics is 98.4 percent.")}
              className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10"
            >
              <Cpu className="w-4 h-4" /> Sync Cloud
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl bg-white/5 ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="text-xl font-bold">{kpi.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Citizen Engagement Trends</h3>
              <Activity className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-[300px]">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
          <div className="glass-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Zone-wise Pollution (AQI)</h3>
              <CloudRain className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-[300px]">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-card col-span-1">
            <h3 className="font-bold mb-6">Hospital Capacity</h3>
            <div className="h-[250px] flex justify-center">
              <Pie data={pieData} options={{ ...chartOptions, scales: { x: { display: false }, y: { display: false } } }} />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-500">Available</span>
                <span>35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-500">Occupied</span>
                <span>53%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-500">Critical</span>
                <span>12%</span>
              </div>
            </div>
          </div>

          <div className="glass-card col-span-1 lg:col-span-2 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <h3 className="font-bold">Real-time Traffic Heatmap</h3>
                <div className="px-2 py-0.5 rounded bg-red-500/20 text-red-500 text-[10px] font-bold animate-pulse">LIVE FEED</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => speak("Current traffic density is high in the central hub. Recommendation: Reroute logistics via Zone B.")}
                  className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-primary transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 glass px-2 py-1 rounded text-[10px]">
                  <Search className="w-3 h-3" /> Search Area
                </div>
                <Maximize2 className="w-4 h-4 text-gray-500 cursor-pointer" />
              </div>
            </div>

            {/* Advanced Heatmap Container */}
            <div className="relative w-full h-[350px] bg-dark/50 rounded-xl overflow-hidden border border-white/10">
               {/* Map Background Layer */}
               <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
               </div>

               {/* Scanline Animation */}
               <motion.div
                 animate={{ top: ['-10%', '110%'] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-20 pointer-events-none"
               />

               {/* Custom Map Grid Overlay */}
               <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10 z-10">
                 {Array.from({ length: 72 }).map((_, i) => (
                   <div key={i} className="border-[0.5px] border-white/20" />
                 ))}
               </div>

               {/* Dynamic Traffic Nodes */}
               <div className="relative z-30 w-full h-full">
                  {/* Traffic Flows */}
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.path
                      d="M 100 100 Q 200 150 400 100 T 700 200"
                      fill="transparent"
                      stroke="rgba(239, 68, 68, 0.4)"
                      strokeWidth="8"
                      strokeDasharray="10 5"
                      animate={{ strokeDashoffset: [-20, 0] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                      d="M 50 300 Q 300 250 500 350"
                      fill="transparent"
                      stroke="rgba(34, 197, 94, 0.4)"
                      strokeWidth="6"
                      strokeDasharray="15 5"
                      animate={{ strokeDashoffset: [0, 20] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>

                  {/* Hotspots */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-1/4 left-1/3 w-16 h-16 bg-red-500 rounded-full blur-2xl"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute top-1/2 left-2/3 w-20 h-20 bg-orange-500 rounded-full blur-3xl"
                  />

                  {/* Floating Data Tags */}
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-[20%] left-[40%] glass p-2 rounded-lg border-red-500/50"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span className="text-[10px] font-bold">CONGESTION 88%</span>
                    </div>
                  </motion.div>

                  {/* Main Hub Marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/marker cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-primary text-[10px] font-bold px-3 py-1 rounded-full mb-1 shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center gap-1"
                    >
                      <Brain className="w-3 h-3" /> AI Node 01
                    </motion.div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse" />
                      <MapIcon className="w-10 h-10 text-primary relative z-10" />
                    </div>
                  </div>
               </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" /> Optimal
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]" /> Slow
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" /> Critical
                </div>
              </div>

              <div className="glass px-3 py-1.5 rounded-lg flex items-center gap-2 text-[10px] text-primary font-bold border-primary/20">
                <TrendingUp className="w-3 h-3" />
                AI PREDICTION: +12% TRAFFIC INCREASE IN 20 MINS
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Alerts & Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
           <div className="glass-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" /> Active Alerts
              </h3>
              <div className="space-y-4">
                {[
                  { title: "High Pollution Alert", area: "Zone D", time: "10m ago" },
                  { title: "Traffic Congestion", area: "Main Hwy", time: "25m ago" },
                  { title: "Water Leakage", area: "Oak St", time: "1h ago" },
                ].map((alert, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.area} • {alert.time}</p>
                  </div>
                ))}
              </div>
           </div>

           <div className="glass-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" /> Utility Monitoring
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Water Reserves</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[78%] h-full bg-blue-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Power Demand</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-yellow-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Waste Collection</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[45%] h-full bg-green-500" />
                  </div>
                </div>
              </div>
           </div>

           <div className="glass-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" /> Crime Analytics
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-3xl font-bold text-green-500">-12%</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Crime Rate vs Last Month</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <p className="font-bold">24</p>
                    <p className="text-[10px] text-gray-500">Patrols Active</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <p className="font-bold">98%</p>
                    <p className="text-[10px] text-gray-500">Response Rate</p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
