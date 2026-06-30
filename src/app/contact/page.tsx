"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 bg-white dark:bg-dark/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions about how CivicMind AI can transform your community? Our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 border border-black/5 dark:border-white/5 rounded-2xl bg-slate-50 dark:bg-white/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Email Us</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm">krishna.coders12@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-black/5 dark:border-white/5 rounded-2xl bg-slate-50 dark:bg-white/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Call Us</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm">+1 (555) 000-1234</p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-black/5 dark:border-white/5 rounded-2xl bg-slate-50 dark:bg-white/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Visit Us</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm">Innovation Hub, Silicon Valley</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="p-8 md:p-12 border border-black/5 dark:border-white/5 rounded-2xl bg-slate-50 dark:bg-white/5">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-gray-400">We will get back to you shortly.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <textarea
                    rows={6}
                    placeholder="Message"
                    required
                    className="w-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500 resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Send Message <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
