import { useState } from 'react';
import { loginReq } from '../lib/auth';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginReq(username, password);
      window.location.href = '/';
    } catch (err: any) {
      setError(err?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 rounded-3xl blur opacity-60"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/60 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Bienvenue</h1>
          <p className="text-slate-300 text-center mb-6">Connectez-vous à votre espace</p>
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-2 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1">Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl bg-slate-800/70 border border-slate-700 text-slate-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="jdoe"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-800/70 border border-slate-700 text-slate-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-slate-900 font-semibold py-3 rounded-xl transition"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


