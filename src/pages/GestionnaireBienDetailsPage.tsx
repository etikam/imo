import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square, User2, Calendar, FileText } from 'lucide-react';
import { bienSeed } from '../components/gestionnaire/biens/BienSeed';

export const GestionnaireBienDetailsPage: React.FC = () => {
  const { id } = useParams();
  const bien = bienSeed.find(b => b.id === id);

  if (!bien) {
    return (
      <div className="pt-24 max-w-5xl mx-auto px-4">
        <Link to="/gestionnaire" className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-slate-300">
          Bien introuvable.
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/gestionnaire" className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>
        <span className="text-xs text-slate-400">ID: {bien.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Galerie */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60">
          <div className="aspect-[16/9] bg-slate-800">
            {bien.photos[0]?.url && (
              <img src={bien.photos[0].url} alt={bien.adresse} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="p-4 grid grid-cols-4 gap-2">
            {bien.photos.slice(1, 9).map(p => (
              <div key={p.id} className="aspect-video rounded-lg overflow-hidden border border-white/10">
                <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Infos */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
          <h1 className="text-2xl font-bold text-white">{bien.adresse}</h1>
          <div className="text-slate-300 flex items-center gap-2"><MapPin className="w-4 h-4" /> {bien.type}</div>
          <div className="grid grid-cols-2 gap-3 text-slate-300">
            <div className="flex items-center gap-2"><Square className="w-4 h-4" /> {bien.surface ?? '-'} m²</div>
            <div className="flex items-center gap-2"><Bed className="w-4 h-4" /> {bien.chambres ?? 0} ch</div>
            <div className="flex items-center gap-2"><User2 className="w-4 h-4" /> {bien.proprietaire ?? '-'}</div>
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Maj {new Date(bien.updatedAt).toLocaleDateString('fr-FR')}</div>
          </div>
          {bien.loyer && (
            <div className="text-white text-xl font-semibold">{new Intl.NumberFormat('fr-FR').format(bien.loyer)} GNF / mois</div>
          )}
          <div className="text-slate-300 text-sm leading-relaxed">{bien.description}</div>
          {bien.plans.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 text-slate-200 mb-2"><FileText className="w-4 h-4" /> Plans</div>
              <div className="flex gap-2 flex-wrap">
                {bien.plans.map(p => (
                  <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-slate-200 text-xs hover:bg-white/20">{p.name ?? 'Plan'}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionnaireBienDetailsPage;






