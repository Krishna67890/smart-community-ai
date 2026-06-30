"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Users, Zap, Shield, Target, Award, CheckCircle2, Globe, Cpu, Database, BarChart3, Camera, Play, Volume2, Sparkles, Github, Linkedin, Twitter } from 'lucide-react';

const AboutPage = () => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [hoverVoiceEnabled, setHoverVoiceEnabled] = useState(false);

  const speak = (text: string, force = false) => {
    if ((hoverVoiceEnabled || force) && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      if (force) {
        utterance.onstart = () => setIsNarrating(true);
        utterance.onend = () => setIsNarrating(false);
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const startTour = () => {
    setHoverVoiceEnabled(true);
    const tourText = "Welcome to CivicMind AI, a flagship project for the Gen AI Academy APAC Edition. I am your neural guide. Our platform is built by Neural Networks, a team of AI innovators building intelligent, cloud-powered solutions that create smarter communities and improve everyday life. We bridge the gap between complex urban data and community well-being using Google Cloud's advanced ecosystem, including Gemini AI and Vertex AI. Meet our visionaries: Priyanka, Geeth, and Mounika, who together with Krishna Patil Rajput, are architecting the future of smart cities.";
    speak(tourText, true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 bg-white dark:bg-dark/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-20 overflow-hidden relative"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-primary/30">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">AI for Better Living</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white">
            Smarter <span className="text-gradient">Communities.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-600 dark:text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed mb-8">
            Empowering cities with Decision Intelligence. CivicMind AI is the bridge between complex urban data and actionable community well-being.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
               <button
                onClick={startTour}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${isNarrating ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/20' : 'glass hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white'}`}
               >
                 {isNarrating ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5" />}
                 {isNarrating ? "AI Narration In Progress..." : "Start AI Audio Tour"}
               </button>

               <button
                onClick={() => setHoverVoiceEnabled(!hoverVoiceEnabled)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${hoverVoiceEnabled ? 'bg-secondary/20 text-secondary border-secondary/50' : 'glass opacity-50 hover:opacity-100 text-slate-900 dark:text-white'}`}
               >
                 <Brain className="w-5 h-5" />
                 {hoverVoiceEnabled ? "Hover Voice: ON" : "Enable Hover Voice"}
               </button>
            </div>
            <div>
              <p className="text-primary font-medium tracking-wide">
                A Flagship Project by <span className="text-slate-900 dark:text-white font-bold">Krishna Patil Rajput</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-gray-500 mt-2 uppercase tracking-[0.2em]">
                Gen AI Academy APAC Edition Hackathon
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Problem Statement Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                <Target className="text-primary w-8 h-8" /> Problem Statement
              </h2>
              <div className="glass-card p-8 border-l-4 border-primary bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Target className="w-24 h-24 text-slate-900 dark:text-white" />
                </div>
                <p className="text-slate-800 dark:text-gray-200 text-lg leading-relaxed mb-6 font-medium">
                  Build an AI-powered Decision Intelligence Platform that leverages data, AI models, and intelligent automation to help individuals, communities, organizations, and city stakeholders analyze information, generate insights, predict outcomes, and make better decisions that improve everyday life and community well-being.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1 h-auto bg-red-500 rounded-full" />
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      <strong>The "Siloed Multimodal" Challenge:</strong> Urban data isn't just numbers; it's unorganized PDFs, chaotic audio, dashcam footage, and sensor streams. Traditional platforms cannot cross-analyze these formats simultaneously.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 h-auto bg-blue-500 rounded-full" />
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      <strong>The "Insight-to-Action" Gap:</strong> Most dashboards only visualize data but fail to automatically orchestrate or execute cross-department workflows to resolve the identified issues.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 h-auto bg-purple-500 rounded-full" />
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      <strong>The Algorithmic Trust Deficit:</strong> Stakeholders hesitate to trust AI "black boxes." We provide transparency and justification for critical civic resource allocations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="glass p-6 rounded-2xl border-black/5 dark:border-white/5">
                 <h4 className="font-bold text-primary mb-2 text-2xl">95%</h4>
                 <p className="text-xs text-slate-500 dark:text-gray-500 uppercase font-semibold">Prediction Accuracy</p>
               </div>
               <div className="glass p-6 rounded-2xl border-black/5 dark:border-white/5">
                 <h4 className="font-bold text-secondary mb-2 text-2xl">Real-time</h4>
                 <p className="text-xs text-slate-500 dark:text-gray-500 uppercase font-semibold">Data Processing</p>
               </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Solution Areas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {[
                "Urban Mobility & Transport",
                "Public Safety & Emergency",
                "Healthcare & Wellness",
                "Environmental Sustainability",
                "Waste & Resource Optimization",
                "Energy Efficiency",
                "Citizen Engagement",
                "Disaster Response & Recovery"
              ].map((area, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-slate-700 dark:text-gray-300 text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 glass bg-slate-100 dark:bg-white/5 rounded-2xl border-dashed border-black/10 dark:border-white/10">
               <p className="text-sm text-slate-600 dark:text-gray-400 italic">
                 "Our platform addresses the challenge of transforming massive community data into intelligent solutions that support decision-making through AI-powered assistance."
               </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Technologies Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Technology Stack Inspiration</h2>
            <p className="text-slate-500 dark:text-gray-500 font-medium">Built with the cutting-edge <span className="text-primary">Google Cloud Ecosystem</span></p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Gemini AI", icon: Brain, desc: "Multimodal LLM for text, image, and audio understanding.", accent: "from-blue-500/20" },
              { title: "Vertex AI", icon: Cpu, desc: "Accelerated ML workflows and model deployment.", accent: "from-purple-500/20" },
              { title: "BigQuery", icon: Database, desc: "Conversational analytics and large-scale data science.", accent: "from-green-500/20" },
              { title: "Vision AI", icon: Camera, desc: "Intelligent computer vision for infrastructure monitoring.", accent: "from-red-500/20" },
              { title: "Cloud Run", icon: Zap, desc: "Scalable, serverless deployment for real-time inference.", accent: "from-orange-500/20" },
              { title: "Cloud Storage", icon: Globe, desc: "Secure and scalable object storage for urban data assets.", accent: "from-cyan-500/20" },
              { title: "Looker", icon: BarChart3, desc: "Business intelligence and data visualization platform.", accent: "from-yellow-500/20" },
              { title: "Identity Platform", icon: Shield, desc: "Secure authentication and user management.", accent: "from-indigo-500/20" }
            ].map((tech, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onMouseEnter={() => speak(tech.title + ". " + tech.desc)}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="glass-card p-6 border-black/5 dark:border-white/5 hover:border-primary/30 transition-all cursor-default relative group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="p-3 bg-slate-200 dark:bg-white/5 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <tech.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
                    {tech.title}
                    <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-500" />
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-gray-500 leading-relaxed font-medium">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-primary/30">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">The Visionaries</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Meet Neural Networks</h2>
            <p className="text-slate-500 dark:text-gray-500 max-w-2xl mx-auto font-medium">
              We are a team of AI innovators building intelligent, cloud-powered solutions for the <span className="text-slate-900 dark:text-white font-semibold">Gen AI Academy APAC Edition Hackathon</span>.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                name: "Krishna Patil Rajput",
                role: "Lead Developer & Architect",
                image: "/Devloper.jpg",
                logo: <Cpu className="w-5 h-5 text-primary" />,
                bio: "Full-stack architect specializing in AI integration and cloud systems.",
                color: "from-blue-500",
                links: {
                  github: "https://github.com/Krishna67890",
                  linkedin: "https://www.linkedin.com/in/krishna-patil-rajput-b66b03340",
                  twitter: "https://x.com/Krishrajputyt"
                }
              },
              {
                name: "Priyanka Jain",
                role: "AI Researcher",
                image: "/girl.png",
                logo: <Brain className="w-5 h-5 text-secondary" />,
                bio: "Deep learning specialist focused on multimodal Gemini implementations.",
                color: "from-purple-500",
                links: { github: "#", linkedin: "#", twitter: "#" }
              },
              {
                name: "Geeth Sahith Munagala",
                role: "Data Scientist",
                image: "/boy.png",
                logo: <Database className="w-5 h-5 text-green-500" />,
                bio: "BigQuery expert transforming urban raw data into actionable insights.",
                color: "from-green-500",
                links: { github: "#", linkedin: "#", twitter: "#" }
              },
              {
                name: "Ummadisetti Mounika",
                role: "UI/UX Designer",
                image: "/girl.png",
                logo: <Zap className="w-5 h-5 text-yellow-500" />,
                bio: "Crafting intuitive, glassmorphic interfaces for complex data visualization.",
                color: "from-yellow-500",
                links: { github: "#", linkedin: "#", twitter: "#" }
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onMouseEnter={() => speak(member.name + ", " + member.role + ". " + member.bio)}
                whileHover={{ y: -10 }}
                className="glass-card p-0 text-center group hover:border-primary/50 transition-all overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${member.color} to-transparent opacity-50`} />
                <div className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${member.color} to-secondary rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity`} />
                    <div className="w-full h-full rounded-full border-2 border-slate-200 dark:border-white/10 overflow-hidden relative z-10">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mb-3">
                    <div className="p-2 glass rounded-lg">
                      {member.logo}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-6 px-4 italic font-medium">
                    "{member.bio}"
                  </p>

                  <div className="flex justify-center gap-4 border-t border-black/5 dark:border-white/5 pt-6">
                    <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.links.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Final Submission Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />

          <Award className="w-20 h-20 text-yellow-500 mx-auto mb-8 animate-bounce" />
          <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Judging Criteria Excellence</h2>
          <p className="text-slate-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-lg leading-relaxed font-medium">
            CivicMind AI is architected to exceed expectations in technical complexity, community impact, and user experience.
            By leveraging Google Cloud's most advanced AI tools, we provide a scalable solution that truly makes cities smarter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Innovation</h4>
                <p className="text-xs text-slate-500 dark:text-gray-500 uppercase tracking-tighter font-bold">Unique AI implementations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Scalability</h4>
                <p className="text-xs text-slate-500 dark:text-gray-500 uppercase tracking-tighter font-bold">Cloud-native architecture</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Social Impact</h4>
                <p className="text-xs text-slate-500 dark:text-gray-500 uppercase tracking-tighter font-bold">Better living for all</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
