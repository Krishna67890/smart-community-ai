import React from 'react';
import Link from 'next/link';
import { Brain, Github, Linkedin, Mail, Twitter, Cpu, Database, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark/80 backdrop-blur-md border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-white">CivicMind <span className="text-primary">AI</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering communities with AI-driven insights for smarter, safer, and more sustainable living. Built for the future of governance.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/assistant" className="hover:text-primary transition-colors">AI Assistant</Link></li>
              <li><Link href="/predictions" className="hover:text-primary transition-colors">Predictive Analytics</Link></li>
              <li><Link href="/image-analysis" className="hover:text-primary transition-colors">Computer Vision</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/responsible-ai" className="hover:text-primary transition-colors">Responsible AI</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://github.com/Krishna67890" target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg hover:text-primary transition-colors text-gray-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/krishna-patil-rajput-b66b03340" target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg hover:text-primary transition-colors text-gray-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/Krishrajputyt" target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg hover:text-primary transition-colors text-gray-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:krishna.coders12@gmail.com" className="p-2 glass rounded-lg hover:text-primary transition-colors text-gray-400">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-400">Developed by <span className="text-primary font-bold">Krishna Patil Rajput</span> & Team</p>
          </div>
        </div>

        {/* Global Tech & Team Showcase */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-wrap justify-center gap-6 mb-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="flex items-center gap-2"><Brain className="w-4 h-4" /> Gemini AI</div>
             <div className="flex items-center gap-2"><Cpu className="w-4 h-4" /> Vertex AI</div>
             <div className="flex items-center gap-2"><Database className="w-4 h-4" /> BigQuery</div>
             <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Decision Intelligence</div>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} CivicMind AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
