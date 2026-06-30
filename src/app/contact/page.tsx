"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      speak("Contact CivicMind AI. Our neural support team and the lead architects are available to discuss enterprise integrations or hackathon collaborations. Please fill out the form or use our direct contact channels.");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    speak("Message received by our neural network. A member of our team will reach out to you within twenty four hours.");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Get in <span className="text-gradient">Touch</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions about how CivicMind AI can transform your community? Our team of experts is ready to help you implement intelligent solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email Us</h3>
                <p className="text-gray-400 text-sm">krishna.coders12@gmail.com</p>
                <p className="text-gray-400 text-sm">support.civicmind@gmail.com</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Call Us</h3>
                <p className="text-gray-400 text-sm">+1 (555) 000-1234</p>
                <p className="text-gray-400 text-sm">Mon-Fri, 9am - 6pm EST</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Visit Us</h3>
                <p className="text-gray-400 text-sm">Innovation Hub, Silicon Valley</p>
                <p className="text-gray-400 text-sm">California, USA</p>
              </div>
            </motion.div>

            <div className="glass-card bg-primary/5 border-primary/20">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Live Chat Available
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Our AI-powered support bot is available 24/7 to answer basic queries.
              </p>
              <button className="w-full btn-primary py-2 text-sm">Start Chatting</button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 md:p-12"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thank you for reaching out. We'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Organization / City</label>
                  <input
                    type="text"
                    placeholder="City of Metropolis"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors appearance-none">
                    <option className="bg-dark">Government Partnership</option>
                    <option className="bg-dark">Enterprise Solutions</option>
                    <option className="bg-dark">Technical Support</option>
                    <option className="bg-dark">Media Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Message</label>
                  <textarea
                    rows={6}
                    placeholder="How can we help your community?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>

                <button className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2">
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Global Reach Section */}
        <div className="mt-20 glass-card p-12 text-center">
          <Globe className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold mb-4">Empowering Cities Worldwide</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            CivicMind AI is currently deployed in over 50 cities across 4 continents, helping millions of citizens every day.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold text-white mb-1">50+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Cities</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-1">12M</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-1">200k</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">AI Decisions/Day</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-1">99.9%</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
