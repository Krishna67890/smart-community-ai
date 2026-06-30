"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle2, QrCode, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PaymentPage = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      speak("Secure Payment Gateway. Please choose your subscription plan to unlock advanced predictive models and priority AI support.");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = () => {
    setIsProcessing(true);
    speak("Verifying transaction with our secure developer gateway. Please wait.");
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      speak("Payment confirmed. Welcome to the Professional Tier. Your account features have been successfully upgraded.");
    }, 2000);
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 bg-dark/50">
      <div className="max-w-md mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="glass-card p-8 relative overflow-hidden">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Subscription Plan</h2>
              <div className="p-4 bg-primary/10 rounded-xl mb-8 border border-primary/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">Professional Plan</p>
                    <p className="text-sm text-gray-400">City-wide analytics</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$499</p>
                    <p className="text-[10px] text-gray-500 uppercase">Per Month</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setStep(2)}
                  className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  Pay with Card <CreditCard className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-full glass py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  Pay with UPI/QR <QrCode className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4" /> Secure payment processed via Stripe
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-6">Scan to Pay</h2>

              <div className="relative inline-block mb-8 group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-[#1A1A1A] p-8 rounded-[28px] border border-white/10 shadow-2xl">
                  {/* Phone Notch/Header Simulation */}
                  <div className="flex justify-between items-center mb-6 px-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">SECURE GATEWAY</div>
                    <div className="w-4 h-2 rounded-full bg-primary/40" />
                  </div>

                  <div className="bg-white p-6 rounded-3xl mb-4 relative overflow-hidden group/qr shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center opacity-0 group-hover/qr:opacity-100 transition-all duration-500 z-20 backdrop-blur-sm">
                      <p className="text-primary font-bold text-sm mb-1">DEVELOPER AUTH</p>
                      <p className="text-dark font-black text-xs">KRISHNA PATIL RAJPUT</p>
                    </div>

                    {/* Decorative QR-like patterns instead of a standard black QR */}
                    <div className="w-44 h-44 relative z-10 grid grid-cols-4 grid-rows-4 gap-2 opacity-80">
                      {[...Array(16)].map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm transition-all duration-500 ${
                            (i % 3 === 0 || i % 7 === 0) ? 'bg-primary' : 'bg-secondary/30'
                          } group-hover/qr:rotate-45 group-hover/qr:scale-75`}
                        />
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border-2 border-primary/20">
                          <span className="text-primary font-black text-xl">KPR</span>
                        </div>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40 m-2" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/40 m-2" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40 m-2" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40 m-2" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400">MERCHANT: CIVICMIND AI</p>
                    <p className="text-[10px] text-gray-600">ID: CM-8829-PX-01</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-gray-300">Waiting for payment confirmation...</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full btn-primary py-4 rounded-xl font-bold transition-all active:scale-[0.98]"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying Transaction...
                  </span>
                ) : 'I have completed payment'}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 text-sm text-gray-500 hover:text-white transition-colors"
              >
                Go Back
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-400 mb-10">Welcome to CivicMind AI Professional. Your dashboard is now being upgraded.</p>

              <Link href="/dashboard" className="w-full btn-primary py-4 px-8 rounded-xl font-bold inline-block">
                Go to Dashboard
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
