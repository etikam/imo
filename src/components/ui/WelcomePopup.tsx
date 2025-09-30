import React from 'react';
import { Link } from 'react-router-dom';

export function WelcomePopup({ userType, onClose }: { userType: string | null; onClose: () => void }) {
  const target = userType === 'manager' ? '/gestionnaire' : userType === 'proprietaire' ? '/proprietaire' : userType === 'locataire' ? '/locataire' : null;
  const label = userType === 'manager' ? 'Dashboard gestionnaire' : 'Mon espace';

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-slate-900 text-slate-100 rounded-2xl p-6 w-full max-w-md border border-slate-700 shadow-2xl">
        <h2 className="text-xl font-semibold mb-2">Connexion réussie</h2>
        <p className="text-slate-300 mb-4">Vous pouvez maintenant accéder à votre espace.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-800">Plus tard</button>
          <Link to={target} onClick={onClose} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-900 font-semibold">
            {label}
          </Link>
        </div>
      </div>
    </div>
  );
}


