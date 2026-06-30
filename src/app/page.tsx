"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  LineChart,
  Shield,
  Camera,
  FileSearch,
  MapPin,
  Bell,
  ArrowRight,
  Play,
  Users,
  Cpu,
  Zap,
  CheckCircle2,
  Database,
  Volume2,
  Video,
  Activity,
  SearchCode,
  Eye,
  Workflow
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Data Sources', value: '1000+', icon: Database },
  { label: 'AI Models', value: '50+', icon: Cpu },
  { label: 'Accuracy', value: '95%', icon: Zap },
  { label: 'Citizens Supported', value: '1M+', icon: Users },
];

const features = [
  {
    title: "Multimodal Emergency Pipeline",
    description: "Real-time incident reporting via video/audio. Gemini analyzes chaos to trigger instant SMS alerts.",
    icon: Video,
    color: "text-red-500"
  },
  {
    title: "Agentic Workflow Automation",
    description: "Autonomous agents that draft work orders and estimate budgets when flaws are detected.",
    icon: Workflow,
    color: "text-blue-500"
  },
  {
    title: "Regulatory RAG 'Diff' Tool",
    description: "Cross-reference new zoning laws against federal guidelines using AlloyDB & Vector Search.",
    icon: SearchCode,
    color: "text-orange-500"
  },
  {
    title: "Explainable AI (XAI)",
    description: "Transparency layer showing feature attributions for every predictive score and decision.",
    icon: Eye,
    color: "text-purple-500"
  },
  {
    title: "Predictive Analytics",
    description: "Forecast traffic, pollution, and public safety risks with Vertex AI precision.",
    icon: LineChart,
    color: "text-green-500"
  },
  {
    title: "Computer Vision",
    description: "Automated detection of infrastructure damage from live feeds and citizen dashcams.",
    icon: Camera,
    color: "text-cyan-500"
  }
];

const modules = [
  "Transportation", "Healthcare", "Education", "Environment",
  "Energy", "Waste Management", "Tourism", "Emergency Response"
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small community groups and students.",
    features: ["Basic AI Assistant", "Public Data Access", "Weekly Reports", "Community Support"],
    buttonText: "Try Simulation",
    highlight: false
  },
  {
    name: "Professional",
    price: "$499/mo",
    description: "Ideal for city departments and urban planners.",
    features: ["Advanced Vertex AI Models", "Real-time Data Streams", "Daily Predictions", "Priority Support", "Custom Dashboards"],
    buttonText: "Add Transaction",
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale deployment for large metropolitan areas.",
    features: ["Unlimited Data Sources", "Custom Model Training", "Dedicated Infrastructure", "24/7 Premium Support", "On-site Integration"],
    buttonText: "Request Demo",
    highlight: false
  }
];

const Home = () => {
  const speak = (text: string, force = false) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const [isNarrating, setIsNarrating] = React.useState(false);

  const startVoiceTour = () => {
    setIsNarrating(true);
    speak("Welcome to CivicMind AI, a Decision Intelligence Platform for Smarter Communities, flagship project for the Gen AI Academy APAC Edition. I am your neural guide. Our platform is built by Neural Networks, a team of AI innovators building intelligent, cloud-powered solutions that create smarter communities and improve everyday life. From predictive traffic analytics to computer vision for infrastructure maintenance, we are architecting the future of urban living. Explore our modules below to see how we leverage Gemini and Vertex AI for real-world impact.", true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">AI-Powered Decision Intelligence</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Transform Community Data into <span className="text-gradient">Intelligent Decisions.</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                Analyze city data, predict future outcomes, automate workflows, and improve everyday life using the power of Google Cloud AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard" className="btn-primary flex items-center gap-2">
                  Explore Platform <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={startVoiceTour}
                  className={`glass px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all hover:bg-white/10 ${isNarrating ? 'border-primary/50 text-primary' : ''}`}
                >
                  <Volume2 className={`w-5 h-5 ${isNarrating ? 'animate-pulse' : ''}`} /> {isNarrating ? 'AI Narrating...' : 'AI Audio Tour'}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 glass-card p-4 aspect-square flex items-center justify-center border-white/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl -z-10" />
                <Brain className="w-64 h-64 text-primary animate-pulse" />
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-10 right-10 p-4 glass rounded-2xl shadow-xl"
                >
                  <LineChart className="w-8 h-8 text-green-400" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute bottom-10 left-10 p-4 glass rounded-2xl shadow-xl"
                >
                  <Shield className="w-8 h-8 text-blue-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful AI Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools designed to solve complex community challenges using cutting-edge artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="glass-card group"
              >
                <div className={`w-12 h-12 rounded-xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Smart Community Modules</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tailored solutions for every aspect of modern urban life.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-2xl text-center border-white/5 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="text-white font-medium">{module}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Built with Google Cloud Ecosystem</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leveraging the world's most advanced AI and cloud infrastructure to power urban decision-making.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
             {[
               { name: "Gemini", icon: Brain, color: "text-blue-500" },
               { name: "Vertex AI", icon: Cpu, color: "text-purple-500" },
               { name: "BigQuery", icon: Database, color: "text-green-500" },
               { name: "Cloud Run", icon: Zap, color: "text-orange-500" },
               { name: "Vision AI", icon: Camera, color: "text-red-500" },
               { name: "Maps API", icon: MapPin, color: "text-cyan-500" },
               { name: "Dialogflow", icon: Bell, color: "text-yellow-500" }
             ].map((tech) => (
               <motion.div
                 key={tech.name}
                 whileHover={{ y: -5, scale: 1.05 }}
                 className="glass p-6 rounded-2xl flex flex-col items-center gap-3 border-white/5 hover:border-primary/30 transition-all group"
               >
                 <tech.icon className={`w-8 h-8 ${tech.color} group-hover:animate-pulse`} />
                 <span className="text-xs font-bold uppercase tracking-wider">{tech.name}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">System Architecture</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A high-performance, cloud-native pipeline designed for real-time urban intelligence.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { step: "01", name: "Data Ingestion", desc: "IoT Sensors, Video Feeds, PDFs", icon: Database },
                { step: "02", name: "BigQuery ML", desc: "Data Warehouse & Analytics", icon: Activity },
                { step: "03", name: "Vertex AI", desc: "Gemini Multimodal Models", icon: Brain },
                { step: "04", name: "Cloud Run", desc: "Serverless Execution Layer", icon: Zap },
                { step: "05", name: "Frontend", desc: "Interactive Urban Dashboard", icon: Play }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center relative group"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                  <div className="mb-4 flex justify-center">
                    <item.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-bold mb-2">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                  {index < 4 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 z-20">
                      <ArrowRight className="w-4 h-4 text-primary/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your community's needs and scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`glass-card flex flex-col ${plan.highlight ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}
              >
                {plan.highlight && (
                  <div className="bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full self-start mb-6">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500 text-sm">/month</span>}
                </div>
                <p className="text-gray-400 text-sm mb-8">{plan.description}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/payment"
                  className={`w-full py-3 rounded-xl font-bold transition-all text-center ${
                    plan.highlight ? 'btn-primary' : 'glass hover:bg-white/10'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-12">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                CivicMind AI is architected to empower communities with AI-driven insights for smarter, safer, and more sustainable living. We bridge the gap between complex urban data and human well-being.
              </p>
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Lead Architect</p>
                  <p className="font-bold text-primary">Krishna Patil Rajput</p>
                </div>
                <div className="w-px h-10 bg-white/10 hidden md:block" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Hackathon</p>
                  <p className="font-bold">Gen AI Academy APAC</p>
                </div>
              </div>
              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Meet the Full Team <Users className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
               {[
                 { name: "Krishna Patil Rajput", role: "Lead Dev", color: "from-blue-500", image: "/Devloper.jpg" },
                 { name: "Priyanka Jain", role: "AI Researcher", color: "from-purple-500", image: "/girl.png" },
                 { name: "Geeth Sahith Munagala", role: "Data Scientist", color: "from-green-500", image: "/boy.png" },
                 { name: "Ummadisetti Mounika", role: "UI Designer", color: "from-yellow-500", image: "/girl.png" }
               ].map((member, i) => (
                 <motion.div
                   key={i}
                   whileHover={{ scale: 1.02 }}
                   className="glass p-6 rounded-3xl border-white/5 hover:border-primary/20 transition-all flex flex-col items-center text-center"
                 >
                   <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 border border-white/10">
                     <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                   </div>
                   <h4 className="font-bold text-sm mb-1">{member.name}</h4>
                   <p className="text-[10px] text-gray-500 uppercase font-black">{member.role}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
