import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const ManagerDashboard: React.FC = () => {
  const metrics = useMemo(() => ([
    { title: 'Biens actifs', value: 128, trend: '+8.2%', tone: 'from-indigo-500 to-purple-600' },
    { title: 'Taux d’occupation', value: '92%', trend: '+1.3%', tone: 'from-emerald-500 to-teal-600' },
    { title: 'Impayés', value: '6', trend: '-2', tone: 'from-rose-500 to-red-600' },
    { title: 'Demandes maintenance', value: 14, trend: '+3', tone: 'from-amber-500 to-orange-600' },
  ]), []);

  return (
    <div className="space-y-8 p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/70"
          >
            <div className={`absolute inset-x-0 -top-1 h-1 bg-gradient-to-r ${m.tone}`} />
            <div className="p-5">
              <p className="text-slate-400 text-sm">{m.title}</p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{m.value}</span>
                <span className="text-xs text-slate-300">{m.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70">
            <div className="px-5 py-4 border-b border-slate-700/60 flex items-center justify-between">
              <h3 className="text-white font-semibold">Activité récente</h3>
              <button className="text-xs text-slate-400 hover:text-white">Voir tout</button>
            </div>
            <ul className="divide-y divide-slate-700/60">
              {[
                'Contrat de gestion créé - Bien #A-102 (Propriétaire: M. Diallo)',
                'Quittance générée - Locataire: Mme Bah (Août)',
                'Demande maintenance - Fuite d’eau (Bien #B-210)',
                'Contact reçu - Intérêt pour un T3 à Dixinn',
              ].map((item, idx) => (
                <li key={idx} className="px-5 py-4 text-sm text-slate-300">{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70">
            <div className="px-5 py-4 border-b border-slate-700/60 flex items-center justify-between">
              <h3 className="text-white font-semibold">Finances - Aperçu</h3>
              <button className="text-xs text-slate-400 hover:text-white">Exporter</button>
            </div>
            <div className="p-5 text-slate-300 text-sm">
              Graphique (encaissements vs impayés) à intégrer (placeholder).
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70">
            <div className="px-5 py-4 border-b border-slate-700/60">
              <h3 className="text-white font-semibold">Actions rapides</h3>
            </div>
            <div className="p-5 grid grid-cols-1 gap-3">
              {[{ label: 'Nouveau bien' }, { label: 'Nouveau contrat' }, { label: 'Nouveau client' }, { label: 'Relance impayé' }].map((a) => (
                <button key={a.label} className="px-4 py-2 text-left rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all">
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70">
            <div className="px-5 py-4 border-b border-slate-700/60">
              <h3 className="text-white font-semibold">Rappels</h3>
            </div>
            <ul className="p-5 space-y-3 text-sm text-slate-300">
              <li>Fin de contrat - Bien #A-102 dans 25 jours</li>
              <li>Relance loyers - 3 impayés ce mois</li>
              <li>Maintenance planifiée - Ascenseur (Bâtiment C)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};



