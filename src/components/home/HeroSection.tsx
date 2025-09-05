import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building2, Home, Search, Key, Shield, CheckCircle2 } from 'lucide-react';
import { FloatingElement } from '../ui/FloatingElement';
import React from 'react';
import { Link } from 'react-router-dom';

// Importation des images pour garantir qu'elles sont bien chargées par Vite
import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';

export const HeroSection = () => {
  const floatingIcons = [
    { Icon: Building2, delay: 0, position: 'top-20 left-20' },
    { Icon: Home, delay: 0.5, position: 'bottom-20 right-20' },
  ];

  const backgroundImages = [image1, image2, image3];

  // Crossfade entre deux phrases (sans dactylo)
  const sentences = [
    'La plateforme immobilière qui simplifie tout',
    'Une expérience moderne pour locataires et propriétaires',
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % sentences.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image Carousel avec overlay subtil */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            initial={{ 
              opacity: 0,
              scale: 1.1,
            }}
            animate={{
              opacity: [0, 0.5, 0.5, 0],
              scale: [1.1, 1.05, 1.05, 1.1],
            }}
            transition={{
              duration: 15,
              delay: index * 5,
              times: [0, 0.1, 0.9, 1],
              repeat: Infinity,
              repeatDelay: 0,
            }}
          />
        ))}
      </div>

      {/* Overlay gradient sophistiqué + effet animé subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/65 to-slate-950/70" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]">
        <motion.div
          aria-hidden
          initial={{ opacity: 0.25, scale: 1 }}
          animate={{ opacity: [0.25, 0.4, 0.25], scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/25 to-purple-500/25 blur-3xl"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.02, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1.2 }}
          className="absolute -bottom-24 -right-16 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-purple-500/25 to-fuchsia-500/25 blur-3xl"
        />
      </div>

      {/* Hero Content */}
      <section className="relative z-10 px-4 pt-24 lg:px-6 w-full">
        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <FloatingElement
            key={index}
            delay={delay}
            duration={4 + index * 0.5}
            amplitude={15 + index * 5}
            className={`absolute ${position} hidden lg:block`}
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center border border-white/20">
              <Icon className="w-8 h-8 text-emerald-400" />
            </div>
          </FloatingElement>
        ))}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8"
        >
          {/* Titre et sous-titre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="mx-auto max-w-[22ch] sm:max-w-[28ch] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white break-words">
              <span className="sr-only">Message principal</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {sentences[idx]}
                </motion.span>
              </AnimatePresence>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-[60ch] mx-auto leading-relaxed">
              Gérez vos biens ou trouvez votre logement idéal avec une expérience 
              moderne et intuitive, conçue pour les propriétaires et locataires.
            </p>
          </motion.div>

          {/* Intermédiaire illustration: ITCHO entre Locataire et Propriétaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="relative mx-auto max-w-5xl h-[240px] md:h-[280px] lg:h-[300px] hidden md:block"
          >
            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 300" fill="none">
              <defs>
                <linearGradient id="conn" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Left curve (Locataire) */}
              <motion.path
                d="M 150 170 C 320 60, 520 60, 500 150"
                stroke="url(#conn)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 10"
                filter="url(#glow)"
                initial={{ strokeDashoffset: 120 }}
                animate={{ strokeDashoffset: [120, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              />

              {/* Right curve (Propriétaire) */}
              <motion.path
                d="M 850 170 C 680 60, 480 60, 500 150"
                stroke="url(#conn)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 10"
                filter="url(#glow)"
                initial={{ strokeDashoffset: 120 }}
                animate={{ strokeDashoffset: [120, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear', delay: 0.2 }}
              />
            </svg>

            {/* Center node: ITCHO - Intermédiaire de confiance */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-xl" />
                <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-6 shadow-lg">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-sm font-semibold tracking-wide text-indigo-300 uppercase">ITCHO</div>
                  <div className="text-xs text-slate-300">Intermédiaire de confiance</div>
                </div>
              </div>
            </div>

            {/* Left node: Locataire (compact card) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <div className="rounded-2xl border border-indigo-200/60 bg-indigo-50/95 p-4 w-[300px] shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-indigo-700">Locataire</div>
                    <div className="text-xs text-indigo-700/80">Vous cherchez un logement ?</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['Recherche avancée', 'Visites virtuelles', 'Dossiers simplifiés', 'Alertes personnalisées'].map((f) => (
                    <div key={f} className="flex items-center text-[12px] text-indigo-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mr-2" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="group inline-flex w-full items-center justify-between rounded-lg bg-white/90 px-4 py-2.5 text-[13px] font-semibold text-indigo-900 shadow-sm ring-1 ring-black/5 transition hover:bg-white">
                  <span>Commencer</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right node: Propriétaire (compact card) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="rounded-2xl border border-violet-200/80 bg-violet-50/95 p-4 w-[300px] shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white">
                    <Key className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-violet-700">Propriétaire</div>
                    <div className="text-xs text-violet-700/80">Vous avez un bien à gérer ?</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['Gestion locative', 'Suivi financier', 'Maintenance', 'Locataires qualifiés'].map((f) => (
                    <div key={f} className="flex items-center text-[12px] text-violet-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 mr-2" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="group inline-flex w-full items-center justify-between rounded-lg bg-white/90 px-4 py-2.5 text-[13px] font-semibold text-violet-900 shadow-sm ring-1 ring-black/5 transition hover:bg-white">
                  <span>Commencer</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white">
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Mobile illustration (triangulaire et miniaturisée) */}
          <div className="md:hidden mx-auto max-w-sm relative h-[220px]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 220" fill="none">
              <defs>
                <linearGradient id="conn-m" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <filter id="glow-m" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Top to left */}
              <motion.path
                d="M 180 50 C 150 80, 110 120, 70 165"
                stroke="url(#conn-m)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="7 9"
                filter="url(#glow-m)"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: [100, 0] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: 'linear' }}
              />

              {/* Top to right */}
              <motion.path
                d="M 180 50 C 210 80, 250 120, 290 165"
                stroke="url(#conn-m)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="7 9"
                filter="url(#glow-m)"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: [100, 0] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: 'linear', delay: 0.15 }}
              />

              {/* Base line (subtle) */}
              <path d="M 70 165 L 290 165" stroke="rgba(20,184,166,0.25)" strokeWidth="1.5" />
            </svg>

            {/* Top node: ITCHO */}
            <div className="absolute left-1/2 top-[38px] -translate-x-1/2">
              <div className="relative">
                <div className="absolute -inset-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 blur-lg" />
                <div className="relative flex flex-col items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 shadow">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-[11px] font-semibold tracking-wide text-emerald-300 uppercase">ITCHO</div>
                  <div className="text-[10px] text-slate-300">Intermédiaire</div>
                </div>
              </div>
            </div>

            {/* Left node: Locataire */}
            <div className="absolute left-4 bottom-6">
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200/60 bg-emerald-50/90 px-3 py-2 shadow">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <Search className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-700">Locataire</div>
                  <div className="text-[10px] text-emerald-700/80">Logement ?</div>
                </div>
              </div>
            </div>

            {/* Right node: Propriétaire */}
            <div className="absolute right-4 bottom-6">
              <div className="flex items-center gap-2 rounded-lg border border-amber-200/70 bg-amber-50/95 px-3 py-2 shadow">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <Key className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-700">Propriétaire</div>
                  <div className="text-[10px] text-amber-700/80">Bien à gérer ?</div>
                </div>
              </div>
            </div>
          </div>

          {/* Suppression des anciennes cards: contenu déplacé dans les nœuds */}

          {/* Trust Indicators déplacés dans un composant dédié */}
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;