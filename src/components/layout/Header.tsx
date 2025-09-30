import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import BackendStatus from '../home/BackendStatus';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientButton } from '../ui/GradientButton';
import { createPortal } from 'react-dom';

export const Header: React.FC = () => {
  const { currentUser, authLoading, logout } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Observer pour détecter la section active et se réinitialiser lors des changements de route
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const ids = ['hero', 'featured', 'services', 'about', 'illustration'];
    const entriesMap = new Map<string, number>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).id;
        entriesMap.set(id, entry.intersectionRatio);
      });
      let bestId = 'hero';
      let bestRatio = 0;
      entriesMap.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      setActiveSection(bestId);
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Si un hash est présent et connu, le définir immédiatement comme actif
    const hashId = location.hash?.replace('#', '');
    if (hashId && ids.includes(hashId)) {
      setActiveSection(hashId);
    }

    return () => observer.disconnect();
  }, [location.pathname]);

  // Mettre à jour l'état actif lors d'un changement de hash (utile si le menu reste ouvert)
  useEffect(() => {
    const hashId = location.hash?.replace('#', '');
    const ids = ['hero', 'featured', 'services', 'about', 'illustration'];
    if (hashId && ids.includes(hashId)) {
      setActiveSection(hashId);
    }
  }, [location.hash]);

  const navItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Logement', href: '#featured' },
    { label: 'Services', href: '#services' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#illustration' },
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
          <Link to="/">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              const hash = item.href; // e.g. '#services'
              return (
                <Link
                  key={item.label}
                  to={{ pathname: '/', hash }}
                  onClick={(e) => {
                    // If already on home, keep smooth-scroll behavior
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      e.preventDefault();
                      const target = document.querySelector(hash);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // update hash without jump
                        history.replaceState(null, '', `/${hash}`);
                      }
                    }
                  }}
                  className={`font-medium transition-all duration-300 relative group cursor-pointer px-3 py-2 rounded-lg ${
                    isActive
                      ? isScrolled 
                        ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25' 
                        : 'text-white bg-gradient-to-r from-indigo-400 to-purple-500 shadow-lg shadow-indigo-400/25'
                      : isScrolled 
                        ? 'text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:shadow-lg hover:shadow-indigo-500/25' 
                        : 'text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-400/25'
                  }`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                  {!isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-3/4 transition-all duration-300" />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden md:block ml-4">
            <BackendStatus />
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            {!authLoading && !currentUser && (
              <Link to="/login">
                <GradientButton size="sm">Se connecter</GradientButton>
              </Link>
            )}
            {!authLoading && currentUser?.user_type === 'proprietaire' && (
              <Link to="/proprietaire">
                <GradientButton size="sm">Mon espace</GradientButton>
              </Link>
            )}
            {!authLoading && currentUser?.user_type === 'manager' && (
              <Link to="/gestionnaire" className="ml-3">
                <GradientButton size="sm">Dashboard</GradientButton>
              </Link>
            )}
            {!authLoading && currentUser?.user_type === 'locataire' && (
              <Link to="/locataire" className="ml-3">
                <GradientButton size="sm">Mon espace</GradientButton>
              </Link>
            )}
            {!authLoading && currentUser && (
              <button onClick={logout} className="ml-3">
                <GradientButton size="sm">Se déconnecter</GradientButton>
              </button>
            )}
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
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href.substring(1);
                    const hash = item.href;
                    return (
                      <Link
                        key={item.label}
                        to={{ pathname: '/', hash }}
                        className={`block rounded-lg px-4 py-4 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500/30 to-purple-600/30 text-white border-l-4 border-indigo-400 shadow-lg shadow-indigo-500/20'
                            : 'text-slate-200 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-600/20 hover:text-white hover:shadow-lg hover:shadow-indigo-500/10'
                        }`}
                        onClick={(e) => {
                          if (typeof window !== 'undefined' && window.location.pathname === '/') {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            setTimeout(() => {
                              const target = document.querySelector(hash);
                              if (target) {
                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                history.replaceState(null, '', `/${hash}`);
                              }
                            }, 100);
                          }
                        }}
                      >
                        <motion.span
                          initial={{ x: 12, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.05 * i }}
                          className="flex items-center space-x-2 relative z-10"
                        >
                          <span>{item.label}</span>
                          <span className={`text-xs transition-all duration-300 ${
                            isActive ? 'opacity-100 scale-110' : 'opacity-60 group-hover:scale-110'
                          }`}>
                            {isActive ? '●' : '→'}
                          </span>
                        </motion.span>
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
                  {!authLoading && !currentUser && (
                    <Link to="/login" className="block">
                      <GradientButton size="sm" className="w-full">Se connecter</GradientButton>
                    </Link>
                  )}
                  {!authLoading && currentUser?.user_type === 'proprietaire' && (
                    <Link to="/proprietaire" className="block">
                      <GradientButton size="sm" className="w-full">Mon espace</GradientButton>
                    </Link>
                  )}
                  {!authLoading && currentUser?.user_type === 'manager' && (
                    <Link to="/gestionnaire" className="block">
                      <GradientButton size="sm" className="w-full">Dashboard</GradientButton>
                    </Link>
                  )}
                  {!authLoading && currentUser?.user_type === 'locataire' && (
                    <Link to="/locataire" className="block">
                      <GradientButton size="sm" className="w-full">Mon espace</GradientButton>
                    </Link>
                  )}
                  {!authLoading && currentUser && (
                    <button onClick={logout} className="block w-full">
                      <GradientButton size="sm" className="w-full">Se déconnecter</GradientButton>
                    </button>
                  )}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </AnimatePresence>, document.body)}
    </motion.header>
  );
};