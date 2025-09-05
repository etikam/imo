import { motion } from 'framer-motion';
import { ArrowRight, Search, Key, Shield, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const IllustrationSection = () => {
  return (
    <section className="py-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Comment ITCHO vous connecte
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            Une plateforme qui facilite la rencontre entre locataires et propriétaires
          </p>
        </motion.div>

        {/* Illustration principale */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl h-[280px] md:h-[320px] lg:h-[360px]"
        >
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" fill="none">
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
              d="M 150 250 C 320 140, 520 140, 500 230"
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
              d="M 850 250 C 680 140, 480 140, 500 230"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-xl" />
              <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-8 py-6 shadow-xl">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="text-sm font-semibold tracking-wide text-indigo-300 uppercase">ITCHO</div>
                <div className="text-xs text-slate-300">Intermédiaire de confiance</div>
              </div>
            </div>
          </motion.div>

          {/* Left node: Locataire */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <div className="rounded-xl border border-indigo-200/30 bg-white/10 backdrop-blur-md p-4 w-[280px] shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-indigo-300">Locataire</div>
                  <div className="text-sm text-indigo-300/80">Vous cherchez un logement ?</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['Recherche avancée', 'Visites virtuelles', 'Dossiers simplifiés', 'Alertes personnalisées'].map((f) => (
                  <div key={f} className="flex items-center text-sm text-indigo-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 mr-2 flex-shrink-0" />
                    <span className="text-xs">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="group inline-flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-600 hover:to-purple-700">
                <span>Commencer</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right node: Propriétaire */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <div className="rounded-xl border border-violet-200/30 bg-white/10 backdrop-blur-md p-4 w-[280px] shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white">
                  <Key className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-violet-300">Propriétaire</div>
                  <div className="text-sm text-violet-300/80">Vous avez un bien à gérer ?</div>
                </div>

              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['Gestion locative', 'Suivi financier', 'Maintenance', 'Locataires qualifiés'].map((f) => (
                  <div key={f} className="flex items-center text-sm text-violet-200">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 mr-2 flex-shrink-0" />
                    <span className="text-xs">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="group inline-flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-purple-600 hover:to-fuchsia-700">
                <span>Commencer</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="md:hidden mx-auto max-w-sm relative h-[200px] mt-4"
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 280" fill="none">
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
              d="M 180 60 C 150 90, 110 130, 70 175"
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
              d="M 180 60 C 210 90, 250 130, 290 175"
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
            <path d="M 70 175 L 290 175" stroke="rgba(99,102,241,0.25)" strokeWidth="1.5" />
          </svg>

          {/* Top node: ITCHO */}
          <div className="absolute left-1/2 top-[48px] -translate-x-1/2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-lg" />
                              <div className="relative flex flex-col items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3 shadow-lg">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">ITCHO</div>
                <div className="text-[10px] text-slate-300">Intermédiaire</div>
              </div>

            </div>
          </div>

          {/* Left node: Locataire */}
          <div className="absolute left-4 bottom-8">
            <div className="flex items-center gap-3 rounded-lg border border-indigo-200/30 bg-white/10 backdrop-blur-md px-4 py-3 shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-indigo-300">Locataire</div>
                <div className="text-xs text-indigo-300/80">Logement ?</div>
              </div>
            </div>
          </div>

          {/* Right node: Propriétaire */}
          <div className="absolute right-4 bottom-8">
            <div className="flex items-center gap-3 rounded-lg border border-violet-200/30 bg-white/10 backdrop-blur-md px-4 py-3 shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-violet-300">Propriétaire</div>
                <div className="text-xs text-violet-300/80">Bien à gérer ?</div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IllustrationSection;
