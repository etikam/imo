import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Building2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackendStatus from '../home/BackendStatus';
import { GradientButton } from '../ui/GradientButton';
import { createPortal } from 'react-dom';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 min-w-0">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 flex-shrink-0"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                ITCHOH
              </h1>
              <p className={`text-xs font-medium ${
                isScrolled ? 'text-slate-500' : 'text-slate-300'
              }`}>GROUP</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`font-medium transition-colors duration-200 relative group ${
                  isScrolled 
                    ? 'text-slate-700 hover:text-indigo-600' 
                    : 'text-slate-200 hover:text-indigo-300'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>
          <div className="hidden md:block ml-4">
            <BackendStatus />
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm">
              <div className={`flex items-center space-x-2 ${
                isScrolled ? 'text-gray-600' : 'text-slate-300'
              }`}>
                <Phone className="w-4 h-4" />
                <span>+224 627613835</span>
              </div>
              <div className={`flex items-center space-x-2 ${
                isScrolled ? 'text-gray-600' : 'text-slate-300'
              }`}>
                <Mail className="w-4 h-4" />
                <span>contact@itchoh.fr</span>
              </div>
            </div>
            <Link to="/proprietaire">
              <GradientButton size="sm">
                Espace Propriétaire
              </GradientButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors flex-shrink-0 ${
              isScrolled ? 'hover:bg-gray-100' : 'hover:bg-slate-700/50'
            }`}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-slate-200'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-slate-200'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Portal Off-canvas (à droite, non pleine hauteur) */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[1000]"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="absolute right-4 top-4 w-80 max-w-[90%] text-white border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 2rem)' }}
            >
              <div className="absolute inset-0 bg-slate-950" />
              <div className="relative p-6 h-full flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold">ITCHOH</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Fermer" className="p-2 rounded-lg hover:bg-white/10">
                    <X className="w-6 h-6 text-slate-200" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ x: 12, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * i }}
                      className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-white/10"
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector(item.href);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="space-y-3 text-sm text-slate-300 mb-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>+224 627613835</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>contact@itchoh.fr</span>
                    </div>
                  </div>
                  <Link to="/proprietaire" className="block">
                    <GradientButton size="sm" className="w-full">Espace Propriétaire</GradientButton>
                  </Link>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </AnimatePresence>, document.body)}
    </motion.header>
  );
};