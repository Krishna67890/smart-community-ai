"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Brain, Moon, Sun, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState('dark');
  const router = useRouter();

  const checkUser = () => {
    const storedUser = localStorage.getItem('civicmind_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    const interval = setInterval(checkUser, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('civicmind_current_user');
    setUser(null);
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'AI Assistant', href: '/assistant' },
    { name: 'Predictions', href: '/predictions' },
    { name: 'Simulator', href: '/simulator' },
    { name: 'Vision', href: '/image-analysis' },
    { name: 'Responsible AI', href: '/responsible-ai' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20 group-hover:scale-110 transition-transform flex items-center justify-center overflow-hidden w-10 h-10">
                <img src="/Devloper.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "/logo.png")} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">CivicMind <span className="text-primary">AI</span></span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-white mr-2 transition-colors"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 glass px-3 py-1.5 rounded-full border-secondary/30">
                  <User className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium text-secondary">{user.firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-slate-700 dark:text-white px-4 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-sm shadow-lg shadow-primary/20">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-2 px-3 pb-4">
              {user ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="btn-primary w-full bg-red-500 hover:bg-red-600"
                >
                  Logout ({user.firstName})
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center text-white py-2 glass rounded-xl">Login</Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)} className="btn-primary text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
